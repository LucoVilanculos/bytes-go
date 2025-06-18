export interface UserProps {
    _id: string;
    name: string;
    email: string;
    address: {
        city: string;
        country: string;
    };
    phone: string;
    role: 'customer' | 'admin';
}
