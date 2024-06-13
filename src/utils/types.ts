import { T_UserRole } from "@/global";

export interface I_User {
	id: string;
	email: string;
	phone: string;
	password: string;
	pin: string;
	firstName: string;
	lastName: string;
	avatar: string;
	role: T_UserRole;
	//status: T_UserStatus;
	totpSecret: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
	lastLogin: Date;
	lastSeen: Date;
}

export interface I_UserPublic extends Omit<I_User, 'password' | 'totpSecret'> {}