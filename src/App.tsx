import "./App.css";
import { useState } from "react";

const files = {
  children: [
    {
      name: "node_modules",
      children: [
        {
          name: "joi",
          children: [
            {
              name: "node_modules",
            },
            {
              name: "package.json",
            },
          ],
        },
      ],
    },
    {
      name: "package.json",
    },
    {
      name: "vite.config.ts",
    },
  ],
};

type TEntry = {
  name: string;
  children?: TEntry[];
};

function Entry({ entry, depth }: { entry: TEntry; depth: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      {entry.children ? (
        <button className="entry" onClick={() => setExpanded(!expanded)}>
          {expanded ? "- " : "+"} {entry.name}
        </button>
      ) : (
        <div>{entry.name}</div>
      )}
      {expanded && (
        <div style={{ paddingLeft: `${depth * 10}px` }}>
          {entry.children?.map((entry) => (
            <Entry entry={entry} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      {files.children.map((entry) => (
        <Entry entry={entry} depth={1} />
      ))}
    </div>
  );
}

export default App;
