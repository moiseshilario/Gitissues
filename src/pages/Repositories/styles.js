import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lighter,
  },

  headerContainer: {
    padding: metrics.basePadding,
  },

  listContainer: {
    padding: metrics.basePadding,
    paddingTop: 0,
  },

  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  input: {
    padding: metrics.basePadding / 2,
    borderRadius: metrics.baseRadius,
    borderColor: colors.light,
    borderWidth: 1,
    flex: 1,
    backgroundColor: colors.white,
    marginRight: metrics.baseMargin * 2,
  },

  separator: {
    height: 0.5,
    backgroundColor: colors.light,
    marginTop: metrics.baseMargin * 2,
  },
});

export default styles;
