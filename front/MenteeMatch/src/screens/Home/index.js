import React from 'react';

import { Text, Image, View, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import HomeView from '../../components/HomeView';
import { styles } from './styles';

const Home = () => {
  const user = useSelector(state => state.user);
  const getIsMentor = () => {
    if (user.actualRole) return user.actualRole === 'Mentor';
    return !!user.isMentor;
  };
  const isMentor = getIsMentor();

  const usersLikes = useSelector(state =>
    isMentor ? state.user.likedMentees : state.user.likedMentors,
  );

  const usersToConfirm = usersLikes.map((userLike, indice) => (
    <View key={indice}>
      <View style={styles.bord}>
        <Image style={styles.img} source={{ uri: userLike.img }} />
        <Text
          style={styles.name}>{`${userLike.name} ${userLike.surname}`}</Text>
      </View>
    </View>
  ));

  return isMentor || user.mentor ? (
    <HomeView />
  ) : user.likedMentors.length ? (
    <View style={styles.container}>
      <Text style={styles.title}>
        Debes confirmar algun mentor, para eso dirígete a matcher y confirma la
        selección
      </Text>
      <View style={styles.block}>
        <ScrollView>{usersToConfirm}</ScrollView>
      </View>
    </View>
  ) : (
    <View style={styles.box}>
      <Text style={styles.title_1}>Bienvenido a MenteeMatch.</Text>
      <View>
        <Text style={styles.text_1}>
          No tienes un mentor asignado. Por favor dirígete al matcher para
          buscar un mentor que se adecue a tu perfil.
        </Text>
      </View>
      s
    </View>
  );
};

export default Home;
