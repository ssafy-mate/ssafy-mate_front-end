import { useState, useEffect } from 'react';

import Swal from 'sweetalert2';

import { ProjectParams } from '../types/authTypes';

import UserService from '../services/UserService';

import useToken from './reduxHooks/useToken';
import useUserId from './reduxHooks/useUserId';

const useMyTeamId = (project: string) => {
  const [myTeamId, setMyTeamId] = useState<number | null>(null);
  const token = useToken();
  const userId = useUserId();

  useEffect(() => {
    async function fetchMyTeamId(
      token: string,
      userId: number,
      params: ProjectParams,
    ) {
      try {
        const teamId = await UserService.getMyTeamId(token, userId, params);

        setMyTeamId(teamId);
      } catch (error: any) {
        const token_date_expired = localStorage.getItem('token_date');

        if (token_date_expired === null) {
          localStorage.removeItem('persist:root');
          window.location.replace('/');
        }

        Swal.fire({
          title: '내 팀 아이디 조회 오류',
          text: error.response.data.message,
          icon: 'warning',
          confirmButtonColor: '#3396f4',
          confirmButtonText: '확인',
        });
      }
    }

    if (token !== null && userId !== null) {
      fetchMyTeamId(token, userId, { project });
    }
  }, [token, userId, project]);

  return myTeamId;
};

export default useMyTeamId;
