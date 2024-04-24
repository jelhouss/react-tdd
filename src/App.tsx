import FileUpload from "./FileUpload/FileUpload";

function App() {
  return (
    <section>
      <h1>TDD in React.js</h1>
      <p>
        In this example, we defined some stories and implemented them by
        building a dummy component following a fully TDD workflow. This is not a
        real app.
      </p>
      <p>
        For more, read:{" "}
        <a
          href="https://www.jh.tn/blog/react-tdd"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.jh.tn/blog/react-tdd
        </a>
      </p>
      <FileUpload />
    </section>
  );
}

export default App;
