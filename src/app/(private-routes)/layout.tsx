import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import {getCurrentUser} from "@/lib/session";
import { redirect } from "next/navigation";

interface PrivateLayoutProps {
	children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps){
	const user = await getCurrentUser();

	if (!user) {
		redirect('/login')
	}

	return <>{children}</>
}