function BaseNode({ label, bg, data }) {
    return (
      <div className={`p-10 ${bg} rounded-md`}>
        <strong>{label}</strong>
        <p>{data.label || "Edit Me"}</p>
        <Handle type="source" position={Position.Bottom} />
        <Handle type="target" position={Position.Top} />
      </div>
    );
  }
  
  export const ColdEmailNode = (props) => <BaseNode {...props} label="Cold Email" bg="bg-amber-400" />;
  export const WaitDelayNode = (props) => <BaseNode {...props} label="Wait/Delay" bg="bg-red-400" />;
  export const LeadSourceNode = (props) => <BaseNode {...props} label="Lead Source" bg="bg-green-500" />;
  