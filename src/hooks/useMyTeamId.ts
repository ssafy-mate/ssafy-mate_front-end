import { useState, useEffect } from 'react';

import Swal from 'sweetalert2';

import { GetMyTeamIdParams } from '../types/authTypes';

import UserService from '../services/UserService';

import useToken from './useToken';

const useMyTeamId = (project: string) => {
  const [myTeamId, setMyTeamId] = useState<number | null>(null);
  const token = useToken();

  useEffect(() => {
    async function fetchMyTeamId(token: string, params: GetMyTeamIdParams) {
      try {
        const teamId = await UserService.getMyTeamId(token, params);

        setMyTeamId(teamId);
      } catch (error: any) {
        Swal.fire({
          title: '잠시 후 다시 시도해주세요.',
          text: error.response.data.meesage,
          icon: 'warning',
          confirmButtonColor: '#3396f4',
          confirmButtonText: '확인',
        });
      }
    }

    if (token !== null) {
      fetchMyTeamId(token, { project });
    }
  }, [token, project]);

  return myTeamId;
};

export default useMyTeamId;
