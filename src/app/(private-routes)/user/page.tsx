import {getCurrentUser} from "@/lib/session";

export default async function Admin(){
	const user = await getCurrentUser();
	
	return (
		<div >
			DETALHES DO USUARIO: {user?.firstName}
		</div>
	)
}