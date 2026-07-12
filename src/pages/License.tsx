const dependencies = [
  { name: "react", version: "^19.2.7", license: "MIT" },
  { name: "react-dom", version: "^19.2.7", license: "MIT" },
  { name: "react-router", version: "^8.2.0", license: "MIT" },
];

const devDependencies = [
  { name: "@eslint/js", version: "^10.0.1", license: "MIT" },
  { name: "@types/node", version: "^24.13.2", license: "MIT" },
  { name: "@types/react", version: "^19.2.17", license: "MIT" },
  { name: "@types/react-dom", version: "^19.2.3", license: "MIT" },
  { name: "@vitejs/plugin-react", version: "^6.0.3", license: "MIT" },
  { name: "eslint", version: "^10.6.0", license: "MIT" },
  { name: "eslint-plugin-react-hooks", version: "^7.1.1", license: "MIT" },
  { name: "eslint-plugin-react-refresh", version: "^0.5.3", license: "MIT" },
  { name: "globals", version: "^17.7.0", license: "MIT" },
  { name: "typescript", version: "~6.0.2", license: "Apache-2.0" },
  { name: "typescript-eslint", version: "^8.62.0", license: "MIT" },
  { name: "vite", version: "^8.1.1", license: "MIT" },
];

function License() {
  return (
    <div>
      <h1>ライセンス</h1>

      <h2>dependencies</h2>
      <ul>
        {dependencies.map((lib) => (
          <li key={lib.name}>
            {lib.name} ({lib.version}) — {lib.license}
          </li>
        ))}
      </ul>

      <h2>devDependencies</h2>
      <ul>
        {devDependencies.map((lib) => (
          <li key={lib.name}>
            {lib.name} ({lib.version}) — {lib.license}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default License;
