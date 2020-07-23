import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Icon} from 'react-native-eva-icons';
import {
  logMessage,
  WARNING,
  startMoment,
  endMoment,
} from 'react-native-embrace';
import useConstructor from '../util/custom_hooks';

const ListItem = ({
  item,
  deleteItem,
  editItem,
  isEditing,
  editItemDetail,
  saveEditItem,
  handleEditChange,
  itemChecked,
  checkedItems,
}) => {
  const checked = checkedItems.filter(
    (checkedItem) => checkedItem.id === item.id,
  );
  // EMBRACE HINT:
  // Storing constants like moment or breadcrumb names make typos less likely.
  const mountedMoment = 'ListItem Mounted';
  useConstructor(() => {
    //This only happens ONCE and it happens BEFORE the initial render.

    // EMBRACE HINT:
    // Moments are a great way to measure the performance and abandonment of workflows within your application.
    // We recommend to wrap non user interruptable flows with moments. For example, here we are measuring how long
    // it takes this component to render.
    startMoment(mountedMoment);
  });

  useEffect(() => {
    //This only happens ONCE. But it happens AFTER the initial render

    // EMBRACE HINT:
    // This is where we end our edit item moment.  We wanted to measure this interaction as it is core to our user experience.
    // By measuring user interactions in this manner you can start to understand how app performance impacts your user journey.
    // Always make sure to end moments you start, Embrace considered any non-ended moment to be an abandonment by the user
    endMoment(mountedMoment);
  });

  useEffect(() => {
    // EMBRACE HINT:
    // Event logging is how you can ensure that events are available in alerts as they happen, rather than when sessions end.
    // If you are tracking down a difficult bug, or trying to understand a complex interaction -- logging is an appropriate API to use.
    // For lighter weight tracking like navigation events, use breadcrumbs.
    logMessage('ListItem Got updated:', WARNING, {item}, true);
    // When you use logging events, these are immediately sent to our servers and are meant to be the basis for alerting you to
    // real-time issues with your application in production.  As such, take care not to over-use logging events as they have a higher impact
    // on the performance of your app vs breadcrumbs.
    // Note that our log is a complex object, not a simple string.  By breaking out properties like this we can use their values to power
    // our alerting. We can also search and filter on the property values -- we cannot do that if we only send strings.
    // Taking a screenshot is a way to see what the user was looking at yourself.  Consider the users privacy and the impact on performance
    // when enabling this feature.
  }, [item]);

  return (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.listItemView}>
        {isEditing && editItemDetail.id === item.id ? (
          <TextInput
            placeholder="Edit Item..."
            style={styles.editItemInput}
            onChangeText={handleEditChange}
          />
        ) : (
          <Text
            onPress={() => itemChecked(item.id, item.text)}
            style={
              checked.length ? styles.checkedItemText : styles.listItemText
            }>
            {item.text}
          </Text>
        )}
        <View style={styles.iconView}>
          {isEditing && editItemDetail.id === item.id ? (
            <TouchableOpacity onPress={() => saveEditItem(item.id, item.text)}>
              <Icon name="save" fill="green" width={20} height={20} />
            </TouchableOpacity>
          ) : (
            !checked.length && (
              <TouchableOpacity onPress={() => editItem(item.id, item.text)}>
                <Icon name="edit" width={20} height={20} fill="blue" />
              </TouchableOpacity>
            )
          )}

          <TouchableOpacity onPress={() => deleteItem(item.id)}>
            <Icon name="trash" width={20} height={20} fill="firebrick" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemText: {
    fontSize: 18,
  },
  checkedItemText: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    color: 'green',
  },
  iconView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 70,
  },
  editItemInput: {
    padding: 0,
    fontSize: 18,
  },
});

export default ListItem;
