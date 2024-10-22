import FormikYup from './src/example/FormikYup';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <FormikYup />
    </ApplicationProvider>
  );
};

export default App;
