import AdminLayout from "@/pages/Admin/Layout";
import useAdminOrdersHook from "@/hooks/orders/useAdminOrdersHook";
import EmptyContent from "@/components/EmptyContent/EmptyContent";
import Pagination from "@/components/Pagination/Pagination";
import React from "react";
import Table from "@/components/Table/Table";

export default function AdminOrders() {
  const {list, page, setPage, pageSize, loading, loadingError, total, refresh} = useAdminOrdersHook();

  return (
    <AdminLayout
      title="Orders"
    >
      {loading
        ? <EmptyContent message="Getting orders..." />
        : loadingError
          ? (
            <EmptyContent
              message={loadingError}
              buttons={[
                {children: "Retry", onClick: refresh},
              ]}
            />
          )
          : (
            <>
              <Table
                columns={[
                  {label: "ID", dataKey: "id"},
                  {label: "Amount", dataKey: "total_amount"},
                  {label: "Unit", dataKey: "unit"},
                  {label: "User", dataKey: "user"},
                  {label: "Date", dataKey: "created_at"},
                ]}
                data={list}
              />
              <Pagination
                total={total}
                page={page}
                pageSize={pageSize}
                setPage={setPage}
                target="user/wallet"
              />
            </>
          )
      }
    </AdminLayout>
  )
}
