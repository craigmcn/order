import NamesProvider from './contexts/NamesContext';
import Header from './components/Header';
import Form from './components/Form';
import Results from './components/Results';
import Aside from './components/Aside/Aside';
import ConfirmDialog from './components/StoredNames/ConfirmDialog';

function App() {
  return (
    <div className="dark:bg-slate-900 flex">
      <ConfirmDialog />
      <NamesProvider>
        <main className="container max-w-lg min-w-min mx-auto my-4 px-4">
          <Header title={'Generate Speaking Order'} />

          <Form />

          <Results />
        </main>

        <Aside />
      </NamesProvider>
    </div>
  );
}

export default App;
