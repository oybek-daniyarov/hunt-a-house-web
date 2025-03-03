import { getLocationRoots } from '@/lib/data/laravel/location/location.api';
import AgentSteps from './agent-steps';

const AgentForm = async () => {
  const [locationsResponse] = await Promise.all([getLocationRoots()]);

  return <AgentSteps locations={locationsResponse.data || []} />;
};

export default AgentForm;
