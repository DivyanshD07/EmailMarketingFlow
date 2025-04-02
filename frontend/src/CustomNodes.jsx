import { Handle, Position } from "@xyflow/react";
import React from "react";

export function ColdEmailNode({ data }) {
    return (
        <div className="p-10 bg-amber-400 rounded-md">
            <strong>Cold Email</strong>
            <p>{data.label || "Edit Me"}</p>
            <Handle type="source" position={Position.Bottom} />
            <Handle type="target" position={Position.Top} />
        </div>
    );
}

export function WaitDelayNode({ data }) {
    return (
        <div className="p-10 bg-red-400 rounded-md">
            <strong>Wait/Delay</strong>
            <p>{data.label || "Edit Me"}</p>
            <Handle type="source" position={Position.Bottom} />
            <Handle type="target" position={Position.Top} />
        </div>
    );
}


export function LeadSourceNode({ data }) {
    return (
        <div className="p-10 bg-green-500 rounded-md">
            <strong>Lead Source</strong>
            <p>{data.label || "Edit Me"}</p>
            <Handle type="source" position={Position.Bottom} />
            <Handle type="target" position={Position.Top} />
        </div>
    );
}

