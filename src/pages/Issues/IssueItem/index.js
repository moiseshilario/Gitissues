import React from 'react';
import PropTypes from 'prop-types';

import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

const IssueItem = ({ issue, onPress }) => (
  <TouchableOpacity onPress={() => onPress(issue.html_url)}>
    <View style={styles.container}>
      <Image style={styles.avatar} source={{ uri: issue.user.avatar_url }} />
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {issue.title}
        </Text>
        <Text style={styles.organization}>{issue.user.login}</Text>
      </View>
      <Icon style={styles.icon} name="chevron-right" />
    </View>
  </TouchableOpacity>
);

IssueItem.propTypes = {
  issue: PropTypes.shape({
    title: PropTypes.string.isRequired,
    user: PropTypes.shape({
      login: PropTypes.string.isRequired,
      avatar_url: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};

export default IssueItem;
