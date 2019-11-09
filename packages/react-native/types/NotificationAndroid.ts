/*
 * Copyright (c) 2016-present Invertase Limited
 */

/**
 * The interface for Android specific options which are applied to a notification.
 *
 * #### Example
 *
 * ```js
 * const notification = {
 *   body: 'Hello World!',
 *   android: {
 *     color: '#3F51B5',
 *     autoCancel: false,
 *     ongoing: true,
 *   },
 * };
 *
 * await notifee.displayNotification(notification);
 * ```
 *
 * @platform android
 */
export interface NotificationAndroid {
  /**
   *
   */
  actions?: AndroidAction[];

  /**
   * Setting this flag will make it so the notification is automatically canceled when the user
   * clicks it in the panel.
   *
   * By default when the user taps a notification it is automatically removed from the notification
   * panel. Setting this to `false` will keep the notification in the panel.
   *
   * If `false`, the notification will persist in the notification panel after being pressed. It will
   * remain there until the user removes (e.g. swipes away) or is cancelled via `removeDeliveredNotification`.
   *
   * Defaults to `true`.
   */
  autoCancel?: boolean;

  /**
   * Starting with 8.0 (API level 26), notification badges (also known as notification dots) appear
   * on a launcher icon when the associated app has an active notification. Users can long-press
   * on the app icon to reveal the notifications (alongside any app shortcuts).
   *
   * ![Badges](https://developer.android.com/images/ui/notifications/badges-open_2x.png)
   *
   * If the notification is shown as a badge, this option can be set to control how the badge icon
   * is shown:
   *
   * - `NONE`: Always shows as a number.
   * - `SMALL`: Uses the icon provided to `smallIcon`.
   * - `LARGE`: Uses the icon provided to `largeIcon`.
   *
   * Defaults to `AndroidBadgeIconType.NONE`.
   */
  badgeIconType?: AndroidBadgeIconType;

  /**
   * Assigns the notification to a category. Use the one which best describes the notification.
   *
   * The category may be used by the device for ranking and filtering.
   *
   * ```js
   * const notification = {
   *   body: 'Congratulations...',
   *   android: {
   *     category: notifee.AndroidCategory.MESSAGE,
   *   },
   * };
   *
   * await notifee.displayNotification(notification);
   * ```
   */
  category?: AndroidCategory;

  /**
   * Specify the `AndroidChannel` which the notification will be delivered on.
   *
   * Channels override any notification options.
   *
   * > On Android 8.0 (API 26) the channel ID is required. Providing a invalid channel ID will throw an error.
   *
   * #### Example
   *
   * ```js
   * const channelId = notifee.createChannel({
   *   channelId: 'my-custom-channel',
   *   name: 'Custom Notification Channel',
   * });
   *
   * await notifee.displayNotification({
   *   body: 'Notification with channel',
   *   android: {
   *     channelId,
   *   },
   * });
   * ```
   */
  channelId?: string;

  /**
   * A click action is used to help identify a notification which is being handled by your application.
   *
   * #### Example
   *
   * ```js
   * const notification = {
   *   body: 'Update your settings',
   *   android: {
   *     channelId: 'open_settings',
   *   },
   * };
   *
   * await notifee.displayNotification(notification);
   *
   * ...
   *
   * // The user taps the notification....
   * const notification = await notifee.getInitialNotification();
   *
   * if (notification.android.clickAction === 'open_settings') {
   *   // open settings view
   * }
   * ```
   */
  clickAction?: string;

  /**
   * Set an custom accent color for the notification. If not provided, the default notification
   * system color will be used.
   *
   * The color can be a predefined system `AndroidColor` or [hexadecimal](https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4).
   *
   * #### Example
   *
   * Using a predefined color.
   *
   * ```js
   * import notifee, { AndroidColor } from '@notifee/react-native';
   *
   * await notifee.displayNotification({
   *   android: {
   *     color: AndroidColor.AQUA,
   *   },
   * });
   * ```
   *
   * #### Example
   *
   * Using a hexadecimal color.
   *
   * ```js
   * import notifee, { AndroidColor } from '@notifee/react-native';
   *
   * await notifee.displayNotification({
   *   android: {
   *     color: '#2196f3', // material blue
   *     // color: '#802196f3', // 50% opacity material blue
   *   },
   * });
   * ```
   */
  color?: AndroidColor | string;

  /**
   * Set whether this notification should be colorized. When set, the color set with `color`
   * will be used as the background color of this notification.
   *
   * This should only be used for high priority ongoing tasks like navigation, an ongoing call,
   * or other similarly high-priority events for the user.
   *
   * For most styles, the coloring will only be applied if the notification is for a foreground service notification.
   */
  colorized?: boolean;

  // TODO is this needed? https://stackoverflow.com/a/40753998/11760094 - use subtext instead?
  contentInfo?: string;

  // todo
  defaults?: AndroidDefaults[];

  /**
   * Set this notification to be part of a group of notifications sharing the same key. Grouped notifications may
   * display in a cluster or stack on devices which support such rendering.
   *
   * To make this notification the summary for its group, set `groupSummary` to `true`.
   *
   * ![Grouped Notifications](https://developer.android.com/images/ui/notifications/notification-group_2x.png)
   *
   * ```js
   * import notifee from '@notifee/react-native';
   *
   * await notifee.displayNotification({
   *   android: {
   *     group: message.group.id,
   *   },
   * });
   * ```
   */
  group?: string;

  /**
   * Sets the group alert behavior for this notification. Use this method to mute this notification
   * if alerts for this notification's group should be handled by a different notification. This is
   * only applicable for notifications that belong to a `group`. This must be called on all notifications
   * you want to mute. For example, if you want only the summary of your group to make noise, all
   * children in the group should have the group alert behavior `AndroidGroupAlertBehavior.SUMMARY`.
   *
   * See `AndroidGroupAlertBehavior` for more information on different behaviours.
   *
   * Defaults to `AndroidGroupAlertBehavior.ALL`.
   *
   * #### Example
   *
   * ```js
   * import notifee, { AndroidGroupAlertBehavior } from '@notifee/react-native';
   *
   * await notifee.displayNotification({
   *   android: {
   *     group: message.group.id,
   *     groupAlertBehavior: AndroidGroupAlertBehavior.CHILDREN,
   *   },
   * });
   * ```
   */
  groupAlertBehavior?: AndroidGroupAlertBehavior;

  /**
   * Whether this notification should be a group summary.
   *
   * If `true`, Set this notification to be the group summary for a group of notifications. Grouped notifications may display in
   * a cluster or stack on devices which support such rendering. Requires a `group` key to be set.
   *
   * Defaults to `false`.
   */
  groupSummary?: boolean;

  /**
   * Sets a large icon on the notification.
   *
   * ![Large Icon](https://prismic-io.s3.amazonaws.com/invertase%2F3f2f803e-b9ae-4e6b-8b58-f0b8ab01aa52_new+project+%2819%29.jpg)
   *
   * TODO: example, URL?
   */
  largeIcon?: string;

  /**
   * Sets the color and frequency of the light pattern. This only has effect on supported devices.
   *
   * The option takes an array containing a hexadecimal color value or predefined `AndroidColor`,
   * along with the number of milliseconds to show the light, and the number of milliseconds to
   * turn off the light. The light frequency pattern is repeated.
   *
   * #### Example
   *
   * Show a red light, for 300ms and turn it off for 600ms.
   *
   * ```js
   * await notifee.displayNotification({
   *   android: {
   *     lights: ['#f44336', 300, 600],
   *   },
   * });
   * ```
   */
  lights?: [AndroidColor | string, number, number];

  /**
   * Set whether or not this notification is only relevant to the current device.
   *
   * Some notifications can be bridged to other devices for remote display. This hint can be set to recommend this notification not be bridged.
   *
   * Defaults to `false`.
   */
  localOnly?: boolean;

  /**
   * Set the large number at the right-hand side of the notification.
   */
  number?: number;

  /**
   * Set whether this is an on-going notification.
   *
   * - Ongoing notifications are sorted above the regular notifications in the notification panel.
   * - Ongoing notifications do not have an 'X' close button, and are not affected by the "Clear all" button.
   */
  ongoing?: boolean;

  /**
   * Set this flag if you would only like the sound, vibrate and ticker to be played if the notification is not already showing.
   */
  onlyAlertOnce?: boolean;

  /**
   * Set the relative priority for this notification. Priority is an indication of how much of the
   * user's valuable attention should be consumed by this notification. Low-priority notifications
   * may be hidden from the user in certain situations, while the user might be interrupted for a
   * higher-priority notification. The system sets a notification's priority based on various
   * factors including the setPriority value. The effect may differ slightly on different platforms.
   *
   * Defaults to `AndroidPriority.DEFAULT`.
   *
   * See `AndroidPriority` for descriptions of each priority settings.
   *
   * #### Example
   *
   * ```js
   * await notifee.displayNotification({
   *   android: {
   *     priority: notifee.AndroidPriority.LOW,
   *   },
   * });
   * ```
   */
  priority?: AndroidPriority;

  /**
   * A notification can show current progress of a task. The progress state can either be fixed or
   * indeterminate (unknown).
   *
   * #### Example - Fixed Progress
   *
   * ![Fixed Progress](https://miro.medium.com/max/480/1*OHOY45cU27NaYkF0MU3hrw.gif)
   *
   * ```js
   * await notifee.displayNotification({
   *   notificationId: 'upload-task',
   *   android: {
   *     progress: {
   *       max: 10,
   *       current: 0,
   *     }
   *   },
   * });
   *
   * // Sometime later... Set progress to 50%
   * await notifee.displayNotification({
   *   notificationId: 'upload-task',
   *   android: {
   *     progress: {
   *       max: 10,
   *       current: 5,
   *     }
   *   },
   * });
   * ```
   *
   * #### Example - Indeterminate Progress
   *
   * Setting `indeterminate` to `true` overrides the `max`/`current` settings.
   *
   * ![Progress](https://miro.medium.com/max/480/1*mW-_3PUxAG1unAZOf0IuoQ.gif)
   *
   * ```js
   * await notifee.displayNotification({
   *   android: {
   *     progress: {
   *       max: 10,
   *       current: 5,
   *       indeterminate: true,
   *     }
   *   },
   * });
   * ```
   */
  progress?: AndroidProgress;

  // todo
  remoteInputHistory?: string[];

  /**
   * If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut,
   * in case the Launcher wants to hide the shortcut.
   *
   * Note: This field will be ignored by Launchers that don't support badging or shortcuts.
   */
  shortcutId?: string;

  /**
   * Sets whether the timestamp provided to `when` is shown in the notification.
   *
   * Setting this field is useful for notifications which are more informative with a timestamp,
   * such as a message.
   *
   * If no `when` timestamp is set, this field has no effect.
   *
   * #### Example
   *
   * Assuming the current notification has delivered to the user 8 minutes ago, the timestamp
   * will be displayed to the user in the notification, for example:
   *
   * ![When Timestamp](https://prismic-io.s3.amazonaws.com/invertase%2F3f2f803e-b9ae-4e6b-8b58-f0b8ab01aa52_new+project+%2819%29.jpg)
   *
   * ```js
   * await notifee.displayNotification({
   *   android: {
   *     when: Date.now(),
   *     showWhenTimestamp: true,
   *   },
   * });
   * ```
   */
  showWhenTimestamp?: boolean;

  /**
   * The small icon for the notification.
   *
   * To set custom small icon levels (e.g. for battery levels), see below.
   *
   * ![Small Icon](https://prismic-io.s3.amazonaws.com/invertase%2F566dd0e6-99bc-4e58-82c1-755f0225ec0b_new+project+%2820%29.jpg)
   *
   * #### Example
   *
   * ```js
   * await notifee.displayNotification({
   *   bodyL: 'Custom small icon',
   *   android: {
   *     smallIcon: 'my_app_icon',
   *   },
   * });
   * ```
   */
  // TODO merge docs with one below
  // smallIcon?: string;

  /**
   * The small icon for the notification with various levels.
   *
   * Icon levels can be used to show different icons. For example if displaying a notification about the
   * device battery level, 4 different levels can be defined (4 = full battery icon, 1 = low battery icon).
   *
   * #### Example
   *
   * ```js
   * await notifee.displayNotification({
   *   bodyL: 'Custom small icon',
   *   android: {
   *     smallIcon: ['battery_level', 2],
   *   },
   * });
   * ```
   */
  smallIcon?: [string, number] | string;

  /**
   * Set a sort key that orders this notification among other notifications from the same package.
   * This can be useful if an external sort was already applied and an app would like to preserve
   * this. Notifications will be sorted lexicographically using this value, although providing
   * different priorities in addition to providing sort key may cause this value to be ignored.
   *
   * If a `group` has been set, the sort key can also be used to order members of a notification group.
   */
  sortKey?: string;

  /**
   * Styled notifications provide users with more informative content and additional functionality.
   * The current supported formats are:
   *
   * 1. **Big Picture Style**: Shows a large picture when expanded. See `AndroidBigPictureStyle` for more information and examples.
   * 2. **Big Text Style**: Shows a large volume of text when expanded. See `AndroidBigTextStyle` for more information and examples.
   *
   * #### Example - Big Picture Style
   *
   * #### Example - Big Text Style
   *
   * ```js
   * await notifee.displayNotification({
   *   body: 'Congratulations you have won a prize...',
   *   android: {
   *     style: {
   *       type: notifee.AndroidStyle.BIGTEXT,
   *       text: 'Congratulations you have won a prize. To claim the prize please login to your account...'
   *     }
   *   },
   * });
   * ```
   **/
  style?: AndroidBigPictureStyle | AndroidBigTextStyle;

  /**
   * A ticker is used for accessibility purposes for devices with accessibility services enabled. Text passed
   * to `ticker` will be audibly announced.
   *
   * Ticker text does not show in the notification.
   *
   * #### Example
   *
   * ```js
   * await notifee.displayNotification({
   *   android: {
   *     body: 'You have 1 new message',
   *     ticker: 'A new message has been received',
   *   },
   * });
   * ```
   */
  ticker?: string;

  /**
   * Sets the time in milliseconds at which the notification should be
   * cancelled, if it is not already cancelled.
   *
   * #### Example
   *
   * Time out in 10 minutes.
   *
   * ```js
   * await notifee.displayNotification({
   *   body: 'Limited time prize available',
   *   android: {
   *     timeoutAfter: Date.now() + 600000,
   *   },
   * });
   * ```
   */
  timeoutAfter?: number;

  /**
   * Show the `when` field as a stopwatch. Instead of presenting when as a timestamp, the
   * notification will show an automatically updating display of the minutes and seconds from the `when` timestamp.
   * Useful when showing an elapsed time (like an ongoing phone call).
   *
   * If no `when` timestamp is set, this has no effect.
   *
   * Defaults to `false`.
   *
   * #### Example
   *
   * ```js
   * await notifee.displayNotification({
   *   body: 'Limited time prize available',
   *   android: {
   *     when: Date.now() + 300000,
   *     usesChronometer: true,
   *   },
   * });
   * ```
   */
  usesChronometer?: boolean;

  /**
   * Enables and sets the vibrate pattern.
   *
   * The pattern in milliseconds. Must be an even amount of numbers.
   *
   * #### Example
   *
   * Vibrate for 300ms with a 300ms delay.
   *
   * ```js
   * await notifee.displayNotification({
   *   android: {
   *     body: 'Vibrating notification',
   *     vibrationPattern: [300, 300],
   *   },
   * });
   * ```
   */
  vibrationPattern?: number[];

  /**
   * Sets the visibility for this notification. This may be used for apps which show user
   * sensitive information (e.g. a banking app).
   *
   * Defaults to `AndroidVisibility.PRIVATE`.
   *
   * See `AndroidVisibility` for more information.
   */
  visibility?: AndroidVisibility;

  /**
   * The timestamp in milliseconds for this notification. Notifications in the panel are sorted by this time.
   *
   * - Use with `showWhenTimestamp` to show the timestamp to the users.
   * - Use with `usesChronometer` to create a on-going timer.
   *
   * #### Example
   *
   * Show the length of time the notification has been showing for.
   *
   * ```js
   * await notifee.displayNotification({
   *   body: 'Phone call in progress',
   *   android: {
   *     ongoing: true,
   *     when: Date.now(),
   *     usesChronometer: true,
   *   },
   * });
   * ```
   */
  when?: number;
}

/**
 * TODO
 *
 * @platform android
 */
export interface AndroidAction {
  key: string;
  icon: string;
  title: string;
  allowGeneratedReplies?: boolean;
  remoteInputs?: AndroidRemoteInput[];
  semanticAction?: AndroidSemanticAction;
  showsUserInterface?: boolean; // true
}

/**
 * TODO
 *
 * @platform android
 */
export interface AndroidRemoteInput {
  key: string;
  extras?: { [key: string]: string };
  allowDataTypes?: string[];
  allowFreeFormTextInput?: boolean; // true
  choices?: string[];
  label?: string;
}

/**
 * Notifications can show a large image when expanded, which is useful for apps with a heavy media
 * focus, such as Instagram.
 *
 * ![Big Picture Style](https://developer.android.com/images/ui/notifications/template-image_2x.png)
 *
 * #### Example
 *
 * ```js
 * TODO example
 * ```
 *
 * @platform android
 */
export interface AndroidBigPictureStyle {
  type: AndroidStyle.BIGPICTURE;
  picture: string;
  title?: string;
  largeIcon?: string;
  summary?: string;
}

/**
 * Notifications can show a large amount of text when expanded, for example when displaying new
 * messages.
 *
 * By default, messages are not expanded, causing any overflowing notification `body` next to be
 * truncated. Setting a `bigTextStyle` allows the notification to be expandable showing the full
 * text body.
 *
 * ![Big Text Style](https://developer.android.com/images/ui/notifications/template-large-text_2x.png)
 *
 * #### Example
 *
 * ```js
 * await notifee.displayNotification({
 *   body: 'Hello World',
 *   android: {
 *     style: {
 *       type: notifee.AndroidStyle.BIGTEXT,
 *       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consectetur magna ut nulla blandit tristique.',
 *     },
 *   }
 * });
 * ```
 *
 * @platform android
 */
export interface AndroidBigTextStyle {
  type: AndroidStyle.BIGTEXT;
  /**
   * The text to display when the notification is expanded.
   */
  text: string;

  /**
   * Overrides the notification title when expanded.
   */
  title?: string;

  /**
   * Sets summary text when the notification is expanded.
   */
  summary?: string;
}

/**
 * Interface for defining the progress of an Android Notification.
 *
 * A notification can show current progress of a task. The progress state can either be fixed or
 * indeterminate (unknown).
 *
 * #### Example - Fixed Progress
 *
 * ![Fixed Progress](https://miro.medium.com/max/480/1*OHOY45cU27NaYkF0MU3hrw.gif)
 *
 * ```js
 * await notifee.displayNotification({
 *   android: {
 *     progress: {
 *       max: 10,
 *       current: 5,
 *     }
 *   },
 * });
 * ```
 *
 * #### Example - Indeterminate Progress
 *
 * Setting `indeterminate` to `true` overrides the `max`/`current` settings.
 *
 * ![Progress](https://miro.medium.com/max/480/1*mW-_3PUxAG1unAZOf0IuoQ.gif)
 *
 * ```js
 * await notifee.displayNotification({
 *   android: {
 *     progress: {
 *       max: 10,
 *       current: 5,
 *       indeterminate: true,
 *     }
 *   },
 * });
 * ```
 *
 * @platform android
 */
export interface AndroidProgress {
  /**
   * The maximum progress number. E.g `10`.
   *
   * Must be greater than the `current` value.
   */
  max: number;

  /**
   * The current progress.
   *
   * E.g. setting to `4` with a `max` value of `10` would set a fixed progress bar on the notification at 40% complete.
   */
  current: number;

  /**
   * If `true`, overrides the `max` and `current` values and displays an unknown progress style. Useful when you have no
   * knowledge of a tasks completion state.
   *
   * Defaults to `false`.
   */
  indeterminate?: boolean;
}

/**
 * An interface for describing an Android Channel.
 *
 * Channels override any individual notification preferences (e.g. lights/vibration) and the user
 * has control over the setting.
 *
 * > On Android 8.0 (API 26) each notification must be assigned to a channel.
 *
 * ![Android Channel](https://prismic-io.s3.amazonaws.com/invertase%2Fbb773539-581a-457d-ae43-687a7a7646a9_new+project+%2822%29.jpg)
 *
 * #### Example
 *
 * ```js
 * await notifee.createChannel({
 *   channelId: 'alarms',
 *   name: 'Alarms & Timers',
 *   lightColor: '#3f51b5',
 *   vibrationPattern: [300, 400],
 * });
 * ```
 *
 * @platform android
 */
export interface AndroidChannel {
  /**
   * The unique channel ID.
   */
  channelId: string;

  /**
   * The channel name. This is shown to the user so must be descriptive and relate to the notifications
   * which will be delivered under this channel.
   *
   * This setting can be updated after creation.
   */
  name: string;

  // todo used?
  bypassDnd?: boolean;

  /**
   * Sets the user visible description of this channel.
   *
   * The recommended maximum length is 300 characters; the value may be truncated if it is too long.
   *
   * This setting can be updated after creation.
   */
  description?: string;

  /**
   * Sets whether notifications posted to this channel should display notification lights, on devices that support that feature.
   *
   * Defaults to `true`.
   *
   * This setting cannot be overridden once the channel is created.
   */
  enableLights?: boolean;

  /**
   * Sets whether notification posted to this channel should vibrate.
   *
   * Defaults to `true`.
   *
   * This setting cannot be overridden once the channel is created.
   */
  enableVibration?: boolean;

  /**
   * Sets what group this channel belongs to. Group information is only used for presentation, not for behavior.
   *
   * Create a group via `createChannelGroup()`.
   *
   * This setting cannot be overridden once the channel is created.
   */
  groupId?: string;

  /**
   * Sets the level of interruption of this notification channel.
   *
   * See `AndroidImportance` for more details on the levels.
   *
   * This setting cannot be overridden once the channel is created.
   */
  importance?: AndroidImportance;

  /**
   * If lights are enabled (via `enableLights`), sets/overrides the light color for notifications
   * posted to this channel.
   *
   * This setting cannot be overridden once the channel is created.
   */
  lightColor?: AndroidColor | string;

  /**
   * Sets whether notifications posted to this channel appear on the lockscreen or not, and if so, whether they appear in a redacted form.
   *
   * This setting cannot be overridden once the channel is created.
   */
  visibility?: AndroidVisibility;

  /**
   * Sets whether notifications posted to this channel can appear as application icon badges in a Launcher.
   *
   * Defaults to `true`.
   */
  showBadge?: boolean;

  // todo
  sound?: string; // audio attributes?

  /**
   * Sets/overrides the vibration pattern for notifications posted to this channel.
   *
   * The pattern in milliseconds. Must be an even amount of numbers.
   */
  vibrationPattern?: number[];
}

/**
 * Interface for an Android Channel Group.
 *
 * ![Channel Group Example](https://prismic-io.s3.amazonaws.com/invertase%2F21fb6bbf-6932-47c3-8695-877e1d4f296b_new+project+%2821%29.jpg)
 *
 * @platform android
 */
export interface AndroidChannelGroup {
  /**
   * Unique id for this channel group.
   */
  channelGroupId: string;

  /**
   * The name of the group. This is visible to the user so should be a descriptive name which
   * categorizes other channels (e.g. reminders).
   */
  name: string;

  /**
   * An optional description of the group. This is visible to the user.
   */
  description?: string;
}

/**
 * When a notification is being displayed as a badge, the `AndroidBadgeIconType` interface
 * describes how the badge icon is shown to the user.
 *
 * @platform android
 */
export enum AndroidBadgeIconType {
  /**
   * Shows no badge, but instead uses the notification `number` if provided.
   */
  NONE = 0,

  /**
   * Shows the notification `smallIcon`.
   */
  SMALL = 1,

  /**
   * Shows the notification `largeIcon`.
   */
  LARGE = 2,
}

/**
 * TODO
 *
 * @platform android
 */
export enum AndroidCategory {
  ALARM = 'alarm',
  CALL = 'call',
  EMAIL = 'email',
  ERROR = 'error',
  EVENT = 'event',
  MESSAGE = 'msg',
  NAVIGATION = 'navigation',
  PROGRESS = 'progress',
  PROMO = 'promo',
  RECOMMENDATION = 'recommendation',
  REMINDER = 'reminder',
  SERVICE = 'service',
  SOCIAL = 'social',
  STATUS = 'status',
  SYSTEM = 'sys',
  TRANSPORT = 'transport',
}

/**
 * A set or predefined colors which can be used with Android Notifications.
 *
 * @platform android
 */
export enum AndroidColor {
  RED = 'red',
  BLUE = 'blue',
  GREEN = 'green',
  BLACK = 'black',
  WHITE = 'white',
  CYAN = 'cyan',
  MAGENTA = 'magenta',
  YELLOW = 'yellow',
  LIGHTGRAY = 'lightgray',
  DARKGRAY = 'darkgray',
  GRAY = 'gray',
  LIGHTGREY = 'lightgrey',
  DARKGREY = 'darkgrey',
  AQUA = 'aqua',
  FUCHSIA = 'fuchsia',
  LIME = 'lime',
  MAROON = 'maroon',
  NAVY = 'navy',
  OLIVE = 'olive',
  PURPLE = 'purple',
  SILVER = 'silver',
  TEAL = 'teal',
}

/**
 * TODO
 *
 * @platform android
 */
export enum AndroidDefaults {
  ALL = -1,
  LIGHTS = 4,
  SOUND = 1,
  VIBRATE = 2,
}

/**
 * TODO
 *
 * @platform android
 */
export enum AndroidGroupAlertBehavior {
  ALL = 0,
  SUMMARY = 1,
  CHILDREN = 2,
}

/**
 *  TODO
 *
 *  https://developer.android.com/reference/android/app/NotificationManager.html#IMPORTANCE_DEFAULT
 *
 *  [A link to AndroidPriority]{@link AndroidPriority} and [a link to AndroidPriority.HIGH]{@link AndroidPriority#HIGH}
 *
 * @platform android
 */
export enum AndroidImportance {
  DEFAULT = 3,
  HIGH = 4,
  LOW = 2,
  MAX = 5,
  MIN = 1,
  NONE = 0,
}

/**
 * TODO
 *
 * https://developer.android.com/reference/androidx/core/app/NotificationCompat#PRIORITY_DEFAULT
 *
 * @platform android
 */
export enum AndroidPriority {
  DEFAULT = 0,
  HIGH = 1,
  LOW = -1,
  MAX = 2,
  MIN = -2,
}

/**
 * TODO
 *
 * @platform android
 */
export enum AndroidSemanticAction {
  /**
   * Archive the content associated with the notification. This could mean archiving an email, message, etc.
   */
  ARCHIVE = 5,

  /**
   * Call a contact, group, etc.
   */
  CALL = 10,

  /**
   * Delete the content associated with the notification. This could mean deleting an email, message, etc.
   */
  DELETE = 4,

  /**
   * Mark content as read.
   */
  MARK_AS_READ = 2,

  /**
   * Mark content as unread.
   */
  MARK_AS_UNREAD = 3,

  /**
   * Mute the content associated with the notification. This could mean silencing a conversation or currently playing media.
   */
  MUTE = 6,

  /**
   * No semantic action defined.
   */
  NONE = 0,

  /**
   * Reply to a conversation, chat, group, or wherever replies may be appropriate.
   */
  REPLY = 1,

  /**
   * Mark content with a thumbs down.
   */
  THUMBS_DOWN = 9,

  /**
   * Mark content with a thumbs up.
   */
  THUMBS_UP = 8,

  /**
   * Unmute the content associated with the notification. This could mean un-silencing a conversation or currently playing media.
   */
  UNMUTE = 7,
}

/**
 * Available Android Notification Styles.
 *
 * Used when providing a `style` to a notification builder with `displayNotification`.
 *
 * @platform android
 */
export enum AndroidStyle {
  BIGPICTURE = 0,
  BIGTEXT = 1,
}

/**
 * Interface used to define the visibility of an Android notification.
 *
 * Use with the `visibility` property on the notification.
 *
 * Default value is `AndroidVisibility.PRIVATE`.
 *
 * @platform android
 */
export enum AndroidVisibility {
  /**
   * Show the notification on all lockscreens, but conceal sensitive or private information on secure lockscreens.
   */
  PRIVATE = 0,

  /**
   * Show this notification in its entirety on all lockscreens.
   */
  PUBLIC = 1,

  /**
   * Do not reveal any part of this notification on a secure lockscreen.
   *
   * Useful for notifications showing sensitive information such as banking apps.
   */
  SECRET = -1,
}
