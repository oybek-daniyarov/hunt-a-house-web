import { ApiResult, handleApiResponse, post } from '@/lib/client/laravel';
import { createUrl, routes } from '@/types/api-routes';

const AGENT_TAGS = ['agents'] as string[];

export async function createAgent(
  data: App.Data.Agent.Payload.CreateAgentPayloadData
): Promise<ApiResult<App.Data.User.UserData>> {
  try {
    const url = createUrl(routes['agents.store']);
    const response = await post<ApiResult<App.Data.User.UserData>>(
      url,
      data,
      AGENT_TAGS
    );
    return handleApiResponse(() => Promise.resolve(response));
  } catch (error) {
    return handleApiResponse(() => Promise.reject(error));
  }
}
