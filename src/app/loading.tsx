import { ProgressCircle } from "@heroui/react";
import React from "react";

const loading = () => {
  return (
    <ProgressCircle isIndeterminate aria-label="Loading">
      <ProgressCircle.Track>
        <ProgressCircle.TrackCircle />
        <ProgressCircle.FillCircle />
      </ProgressCircle.Track>
    </ProgressCircle>
  );
};

export default loading;
