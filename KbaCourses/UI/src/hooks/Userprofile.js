//we are creating a userdefined (custom) hook bcoz we have to use this in many pages

import { useState,useEffect } from "react";

export default function useprofile()
{
    const [profile,setProfile] = useState(null)
    const [loading,setLoading] = useState(true)

    useEffect(()=>
    {
        const fetchprofile = async() =>
        {
            try{
                const res = await fetch('/api/profile',{
                    credentials:'include'
                })

                if(res.ok)
                {
                    const data = await res.json()
                    setProfile(data) //the data contains userrole and username
                }
                else
                {
                    setProfile(null)
                }
            }

            catch(error)
            {
                console.error("Profile fetch error : ",error)
                setProfile(null)
            }
            finally
            {
                setLoading(false)
            }
        }
        fetchprofile()
    },[])

    return {profile,loading}
}