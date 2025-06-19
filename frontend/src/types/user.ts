export interface UserProps {
    _id: string;
    name: string;
    email: string;
    address?: {
        city?: string;
        country?: string;
        bairro?: string;
    };
    phone?: string;
    role: 'customer' | 'driver' | 'admin';
    genero?: string;
    car?: {
        model: string;
        plate: string;
        color?: string;
    };
}