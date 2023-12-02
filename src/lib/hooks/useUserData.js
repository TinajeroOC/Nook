import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import pb from '../pocketbase/initPocketBase';

export function useUserData() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const cookie = Cookies.get('pb_auth')

    async function fetchUser() {
      setUser(await pb.getUser(cookie))
    }

    fetchUser()
  }, [])

  return user;
}

