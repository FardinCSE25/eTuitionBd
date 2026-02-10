import { useQuery } from '@tanstack/react-query';
import UseAuth from './UseAuth';
import UseAxiosSecure from './UseAxiosSecure';

const UseRole = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();

    const {
        data: role,
        isLoading,
    } = useQuery({
        queryKey: ['user-role', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/role`);
            return res.data;
        },
    });

    return { role, isLoading };
};

export default UseRole;