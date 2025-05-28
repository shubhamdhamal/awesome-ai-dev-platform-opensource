import { FlowTemplate, TemplateType } from 'workflow-shared';
import { FastifyBaseLogger } from 'fastify';
import { FindOneOptions, ILike, IsNull, Not } from 'typeorm';
import { flowTemplateService } from '../ee/flow-template/flow-template.service';
import { FlowSchema } from '../flows/flow/flow.entity';
import { flowRepo } from '../flows/flow/flow.repo';
import { flowService } from '../flows/flow/flow.service';
import { listingCategoryRepo } from '../flows/listing/listing-category.repo';

export const marketplaceService = (logger: FastifyBaseLogger) => ({
    async list(page?: number, category?: string, name?: string): Promise<{
        count: number,
        list: TMarketplaceTemplate[],
    }> {
        const conditions: FindOneOptions<FlowSchema>["where"] = {
            listingStatus: true,
            listingUserId: Not(IsNull()),
            ...category ? {listingCategoryId: category} : {},
            ...(name && name.trim().length > 0) ? {listingName: ILike(`%${name}%`)} : {},
        }

        return {
            count: await flowRepo().count({ where: conditions }),
            list: (await flowRepo().find({
                where: conditions,
                order: {
                    updated: 'DESC',
                },
                ...page ? {
                    skip: Math.max(page - 1, 0) * 10,
                    take: 10,
                } : {},
            })).map(f => ({
                id: f.id,
                name: f.listingName ?? "No name",
                price: (f.listingPrice ?? 0) / 100,
                description: f.listingDescription ?? "",
                preview: flowService(logger).getPreviewFlowPublicUrl(f),
                userId: f.listingUserId ?? 0,
                categoryId: f.listingCategoryId ?? "",
            })),
        };
    },

    async detail(id: string): Promise<TMarketplaceTemplate> {
        const flow = (
            await flowRepo().findOneOrFail({
                where: { id },
            })
        )

        return {
            id: flow.id,
            name: flow.listingName ?? "No name",
            price: (flow.listingPrice ?? 0) / 100,
            description: flow.listingDescription ?? "",
            preview: flowService(logger).getPreviewFlowPublicUrl(flow),
            userId: flow.listingUserId ?? 0,
            categoryId: flow.listingCategoryId ?? "",
        }
    },

    async createTemplate(flowId: string, projectId: string, platformId: string): Promise<FlowTemplate> {
        const flow = await flowService(logger).getOnePopulatedOrThrow({
            id: flowId,
            projectId,
        });

        const template = await flowService(logger).getTemplate({
            flowId,
            projectId,
            versionId: flow.version.id,
        });

        return flowTemplateService.upsert(platformId, projectId, {
            type: TemplateType.MARKETPLACE,
            description: flow.listingDescription ?? "",
            template: {
                ...template.template,
                displayName: flow.listingName ?? "No name",
            },
            tags: template.tags,
            metadata: template.metadata,
        });
    },

    async categories() {
        return listingCategoryRepo().find({
            where: {
                enabled: true,
            },
            order: {
                displayName: "ASC",
            }
        })
    },
})

export type TMarketplaceTemplate = {
    id: string,
    name: string,
    price: number,
    description: string,
    preview: string | null,
    userId: number,
    categoryId: string,
}
