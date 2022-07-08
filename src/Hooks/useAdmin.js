import { useEffect, useState } from "react"

const useAdmin = (user) => {
    const [admin, setAdmin] = useState(false);
    const [adLoading, setAdLoading] = useState(true);

    useEffect(() => {
        const email = user?.email;
        if (email) {
            fetch(`http://localhost:5000/admin/${email}`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res =>res.json())
                .then(data => {
                    console.log(data)
                    setAdmin(data.admin)
                    setAdLoading(false)
                })
        }
    }, [user])
    return [admin, adLoading]
}

export default useAdmin;