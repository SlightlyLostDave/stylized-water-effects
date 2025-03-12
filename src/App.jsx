import { useStore } from './hooks/useStore';
import { Loading } from './ui/Loading';

function App() {
  const ready = useStore((state) => state.ready);

  return (
    <>
      <Loading />
    </>
  );
}

export default App;
