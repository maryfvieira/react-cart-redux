
import { ApiResponse } from "@/services/httpclient/model/apiResponse";
import { logout } from "@/utils/auth";

export async function GET(request: Request) {
  await logout();
  
  const response: ApiResponse<any> = {
		statusResponse:200
	};

	return new Response(JSON.stringify(response), {
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

