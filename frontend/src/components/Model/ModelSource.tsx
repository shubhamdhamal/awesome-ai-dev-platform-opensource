import {useGetListMarketplaceGpus} from "@/hooks/settings/ml/useGetListMarketplaceGpus";
import {TProjectModel} from "@/models/project";
import InputBase from "../InputBase/InputBase";
import React from "react";
import ComputeSelect, {TSelectedComputes} from "../ComputeSelect/ComputeSelect";
import Parameters from "./Parameters";
import Source, {isValidSourceData, TModelSources, TSourceData} from "./Source";
import Button from "../Button/Button";
import {useApi} from "@/providers/ApiProvider";
import {usePromiseLoader} from "@/providers/LoaderProvider";
import {toastError} from "@/utils/toast";
import styles from "./ModelSource.module.scss";
import Checkpoint, {TCheckpointData} from "./Checkpoint";
import Framework, {TFramework} from "./Framework";
import useComputeParameters from "@/hooks/computes/useComputeParameters";

export type TProps = {
  project: TProjectModel;
  onAdded?: () => void;
  onClose?: () => void;
  hasCheckpoint?: boolean;
  disallowedSources?: TModelSources[];
  hasFramework?: boolean;
}

export default function ModelSource({project, onAdded, onClose, hasCheckpoint, disallowedSources, hasFramework}: TProps) {
  const {loading, refresh, gpusListModel} = useGetListMarketplaceGpus(project.id, "0", "model-training");
  const [name, setName] = React.useState("");
  const [nameError, setNameError] = React.useState("");
  const [sourceData, setSourceData] = React.useState<TSourceData>({});
  const {call} = useApi();
  const {addPromise} = usePromiseLoader();
  const [adding, setAdding] = React.useState(false);

  const [selectedComputes, setSelectedComputes] = React.useState<TSelectedComputes>({
    cpus: [],
    gpus: [],
  });

  const {
    paramsData,
    setParamsData,
    updateParamsData,
    onCalculateComputeGpu,
    onParameterChange,
    calculatedComputeGpu,
    setCalculatedComputeGpu,
  } = useComputeParameters({selectedComputes, projectID: project.id.toString()});

  const [checkpointData, setCheckpointData] = React.useState<TCheckpointData>({
    checkpoint_source: null,
    checkpoint_id: null,
    checkpoint_token: null,
  });

  const [framework, setFramework] = React.useState<TFramework | undefined>(undefined);

  const onSourceChange = React.useCallback((d: TSourceData) => {
    setSourceData(d);
  }, [setSourceData]);

  const onCheckpointChange = React.useCallback((d: TCheckpointData) => {
    setCheckpointData(d);
  }, [setCheckpointData]);

  const onNameChange = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    setName(ev.currentTarget.value);
    setNameError(ev.currentTarget.value.trim() === "" ? "Please specify the name of the model." : "");
  }, [setName]);

  const onFrameworkChange = React.useCallback((f: TFramework) => {
    setFramework(f);
  }, []);

  const refreshComputes = React.useCallback(() => {
    refresh();
    setSelectedComputes({cpus: [], gpus: []});
    setParamsData(d => ({...d, paramaster: "check", gpu_list_id: ""}));
    setCalculatedComputeGpu({});
  }, [refresh, setSelectedComputes, setParamsData, setCalculatedComputeGpu]);

  const addModel = React.useCallback(() => {
    const errors: string[] = [];

    if (name.trim() === "") {
      setNameError("Please specify the name of the model.");
      errors.push("- Specify the name of the model.");
    }

    if (Object.keys(calculatedComputeGpu).length === 0) {
      errors.push("- Select the computer(s) that will be used to initially compute the parameters.");
    }

    if (!isValidSourceData(sourceData)) {
      errors.push("- Specify the model source.");
    }

    // if (hasCheckpoint && (!checkpointData.checkpoint_source || !checkpointData.checkpoint_id)) {
    //   errors.push("- Specify the checkpoint source.");
    // }
    if (hasCheckpoint) {
      // if (!checkpointData.checkpoint_source || !checkpointData.checkpoint_id) {
      //   errors.push("- Specify the checkpoint source.");
      // }

      if (checkpointData.checkpoint_source === "KAGGLE"
        && (!checkpointData.checkpoint_username || !checkpointData.checkpoint_path)) {
        errors.push("- Specify the Kaggle username and data path.");
      }
    }

    if (errors.length > 0) {
      toastError(
        <>
          <div>Please complete the following:</div>
          {errors.map((e, idx) => <div key={"error-" + idx}>{e}</div>)}
        </>
      );
      return;
    }

    setAdding(true);
    const f = new FormData();
    f.append("name", name.trim());
    f.append("project_id", project.id.toString());
    f.append("project_id", project.id.toString());
    f.append("gpus", JSON.stringify(selectedComputes.gpus));
    f.append("cpus_ids", selectedComputes.cpus.join(","));
    f.append("checkpoint_source", "CLOUD_STORAGE");
    f.append("checkpoint_id", "");
    f.append("model_source", sourceData.model_source ?? "");
    f.append("model_info", JSON.stringify({
      calculate_compute_gpu: JSON.stringify(calculatedComputeGpu),
      project: {
        epochs: 10,
        batch_size: 10,
        batch_size_per_epochs: 2,
      },
      token_length: "4096",
      accuracy: "70",
      sampling_frequency: "48000",
      mono: true,
      fps: "60",
      resolution: "320",
      image_width: "256",
      image_height: "256",
      framework: "pytorch",
      precision: "fp16",
      estimate_time: "time" in calculatedComputeGpu
        ? Math.max(1, parseFloat((calculatedComputeGpu["time"] as number).toString()))
        : 0,
      estimate_cost: "total_cost" in calculatedComputeGpu ? calculatedComputeGpu["total_cost"] : "0",
    }));

    if (sourceData.model_source === "DOCKER_HUB") {
      f.append("docker_image", sourceData.docker_image ?? "");
      f.append("docker_access_token", sourceData.docker_access_token ?? "");
    } else if (sourceData.model_source && ["GIT", "ROBOFLOW", "HUGGING_FACE"].includes(sourceData.model_source)) {
      f.append("model_id", sourceData.model_id ?? "");
      f.append("model_token", sourceData.model_token ?? "");
    } else if (sourceData.model_source === "LOCAL" && sourceData.file) {
      f.append("file", sourceData.file);
    }

    if (hasFramework && framework) {
      f.append("framework", framework);
    }

    if (hasCheckpoint) {
      f.append("checkpoint_source", checkpointData.checkpoint_source ?? "");
      f.append("checkpoint_id", checkpointData.checkpoint_id ?? "");
      f.append("checkpoint_token", checkpointData.checkpoint_token ?? "");
      f.append("checkpoint_username", checkpointData.checkpoint_username ?? "");
      f.append("checkpoint_path", checkpointData.checkpoint_path ?? "");
    }

    const ar = call("addModel", {
      body: f,
    });

    addPromise(ar.promise, "Adding model...");

    ar.promise
      .then(async r => {
        if (r.ok) {
          onAdded?.();
          return;
        }

        const data = await r.json();

        if ("messages" in data) {
          if (typeof data["messages"] === "object") {
            const ks = Object.keys(data["messages"]);

            if (ks.length > 0) {
              const errors = [<div key="errors">Error(s) occurred while adding model:</div>];

              for (let k in data["messages"]) {
                errors.push(<div key={"error-" + k}>- {data["messages"][k]}</div>);
              }

              toastError(<div>{errors}</div>);
              return;
            }
          } else if (typeof data["messages"] === "string") {
            toastError(data["messages"]);
            return;
          }
        }
        if (window.APP_SETTINGS.debug) {
          console.error("An error occurred while adding model. Error: " + r.status + " " + r.statusText);
        }
        // toastError("An error occurred while adding model. Error: " + r.status + " " + r.statusText);
        return;
      })
      .catch(e => {
        if (window.APP_SETTINGS.debug) {
          console.error(e);
        }

        // toastError("An error occurred while adding model. Error: " + e?.toString());
      })
      .finally(() => {
        setAdding(false);
      });
  }, [addPromise, calculatedComputeGpu, call, checkpointData.checkpoint_id, checkpointData.checkpoint_source, checkpointData.checkpoint_token, hasCheckpoint, name, onAdded, project.id, selectedComputes.cpus, selectedComputes.gpus, sourceData, framework, hasFramework, checkpointData.checkpoint_username, checkpointData.checkpoint_path]);

  return (
    <div>
      <InputBase
        autoFocus
        label="Title"
        isControlledValue={true}
        isRequired
        value={name}
        error={nameError.length > 0 ? nameError : undefined}
        onChange={onNameChange}
        disabled={adding}
      />
      <div className={styles.compute}>
        <button
          className={styles.refreshComputes}
          disabled={loading || adding}
          onClick={refreshComputes}
        >
          Refresh Computes
        </button>
        <ComputeSelect
          isLoading={loading}
          computes={gpusListModel}
          selected={selectedComputes}
          onChange={v => setSelectedComputes(v)}
          onClose={() => updateParamsData()}
          isProcessing={adding}
          isRequired={true}
        />
        <Parameters
          data={paramsData}
          onCalculateComputeGpu={onCalculateComputeGpu}
          onParameterChange={onParameterChange}
          isProcessing={adding}
        />
      </div>
      {hasFramework && (
        <div className={styles.framework}>
          <Framework
            framework={framework}
            onChange={onFrameworkChange}
            isProcessing={adding}
            isRequired={true}
          />
        </div>
      )}
      <div className={styles.source}>
        <Source
          label={hasCheckpoint ? "Model source" : "Source code"}
          data={sourceData}
          onChange={onSourceChange}
          disallowedSources={disallowedSources}
          isProcessing={adding}
          isRequired={true}
          isSourceCode={!hasCheckpoint}
        />
      </div>
      {hasCheckpoint && (
        <div className={styles.source}>
          <Checkpoint
            data={checkpointData}
            onChange={onCheckpointChange}
            isProcessing={adding}
            isRequired={false}
          />
        </div>
      )}
      <div className={styles.actions}>
        <Button type="secondary" onClick={onClose}>Cancel</Button>
        <Button onClick={addModel} disabled={adding}>Add</Button>
      </div>
    </div>
  );
}
