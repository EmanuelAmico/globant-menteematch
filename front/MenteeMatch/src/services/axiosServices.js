import generateAxios from '../utils/generateAxios';
import { API_URL } from '@env';
import { simpleMessage } from '../utils';

const postUserSkillsToLearn = async (skills, token) => {
  try {
    const server = generateAxios(token);
    const updatedUser = await server.put(API_URL + '/api/users/skills/learn', {
      skillsToLearn: skills,
    });
    return updatedUser;
  } catch (error) {
    console.log(error);
  }
};

const postUserSkillsToTeach = async (skills, token) => {
  try {
    const server = generateAxios(token);
    const updatedUser = await server.put(API_URL + '/api/users/skills/teach', {
      skillsToTeach: skills,
    });
    return updatedUser;
  } catch (error) {
    console.log(error);
  }
};

const setMenteeToMentor = async (menteeId, mentorId, token) => {
  try {
    const server = generateAxios(token)
    await server.put(API_URL + '/api/users/mentor/set', { id: menteeId, _id: mentorId })
  } catch (error) {
    console.log(error)
  }
}

const setMentorToMentee = async (mentorId, menteeId, token) => {
  try {
    const server = generateAxios(token)
    await server.put(API_URL + '/api/users/mentee/set', { id: mentorId, _id: menteeId })
  } catch (error) {
    if(error.response.status === 400)
      return simpleMessage(
        '¡Error!',
        `El usuario ya no está disponible.`,
        'danger',
      );
    console.log(error)
  }
}


export { postUserSkillsToLearn, postUserSkillsToTeach, setMenteeToMentor, setMentorToMentee };
