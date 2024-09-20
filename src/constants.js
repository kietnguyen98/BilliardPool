const BALL_RADIUS = 0.034;
// table's y + 1/2 table's height (y-axis) + 1/2 ball's height (ball radius)
const BALL_Y_DEFAULT = 0.3185 + 0.05 + BALL_RADIUS;
const BALL_DISTANCE_FROM_CENTER = 2 * BALL_RADIUS + 0.001;
const BALL_1_Z_DEFAULT = -0.46;
const BALL_POSITION = {
  STATIC: [
    //1
    { x: 0, y: BALL_Y_DEFAULT, z: BALL_1_Z_DEFAULT },
    // 5
    {
      x: 0,
      y: BALL_Y_DEFAULT,
      z:
        BALL_1_Z_DEFAULT -
        2 * BALL_DISTANCE_FROM_CENTER * Math.sin(Math.PI / 3),
    }, // 16 - cue ball
    {
      x: (Math.random() / 2) * (Math.random() > 0.5 ? -1 : 1),
      y: BALL_Y_DEFAULT,
      z: 0.6,
    },
  ],
  DYNAMIC: [
    //2
    {
      x: -BALL_DISTANCE_FROM_CENTER * Math.cos(Math.PI / 3),
      y: BALL_Y_DEFAULT,
      z: BALL_1_Z_DEFAULT - BALL_DISTANCE_FROM_CENTER * Math.sin(Math.PI / 3),
    },
    // 3
    {
      x: BALL_DISTANCE_FROM_CENTER * Math.cos(Math.PI / 3),
      y: BALL_Y_DEFAULT,
      z: BALL_1_Z_DEFAULT - BALL_DISTANCE_FROM_CENTER * Math.sin(Math.PI / 3),
    },
    //4
    {
      x: -2 * BALL_DISTANCE_FROM_CENTER * Math.cos(Math.PI / 3),
      y: BALL_Y_DEFAULT,
      z:
        BALL_1_Z_DEFAULT -
        2 * BALL_DISTANCE_FROM_CENTER * Math.sin(Math.PI / 3),
    },

    // 6
    {
      x: 2 * BALL_DISTANCE_FROM_CENTER * Math.cos(Math.PI / 3),
      y: BALL_Y_DEFAULT,
      z:
        BALL_1_Z_DEFAULT -
        2 * BALL_DISTANCE_FROM_CENTER * Math.sin(Math.PI / 3),
    },
    //7
    {
      x: -3 * BALL_DISTANCE_FROM_CENTER * Math.cos(Math.PI / 3),
      y: BALL_Y_DEFAULT,
      z:
        BALL_1_Z_DEFAULT -
        3 * BALL_DISTANCE_FROM_CENTER * Math.sin(Math.PI / 3),
    },
    // 8
    {
      x: -BALL_DISTANCE_FROM_CENTER * Math.cos(Math.PI / 3),
      y: BALL_Y_DEFAULT,
      z:
        BALL_1_Z_DEFAULT -
        3 * BALL_DISTANCE_FROM_CENTER * Math.sin(Math.PI / 3),
    },
    // 9
    {
      x: BALL_DISTANCE_FROM_CENTER * Math.cos(Math.PI / 3),
      y: BALL_Y_DEFAULT,
      z:
        BALL_1_Z_DEFAULT -
        3 * BALL_DISTANCE_FROM_CENTER * Math.sin(Math.PI / 3),
    },
    // 10
    {
      x: 3 * BALL_DISTANCE_FROM_CENTER * Math.cos(Math.PI / 3),
      y: BALL_Y_DEFAULT,
      z:
        BALL_1_Z_DEFAULT -
        3 * BALL_DISTANCE_FROM_CENTER * Math.sin(Math.PI / 3),
    },
    // 11
    {
      x: -4 * BALL_DISTANCE_FROM_CENTER * Math.cos(Math.PI / 3),
      y: BALL_Y_DEFAULT,
      z:
        BALL_1_Z_DEFAULT -
        4 * BALL_DISTANCE_FROM_CENTER * Math.sin(Math.PI / 3),
    },
    // 12
    {
      x: -2 * BALL_DISTANCE_FROM_CENTER * Math.cos(Math.PI / 3),
      y: BALL_Y_DEFAULT,
      z:
        BALL_1_Z_DEFAULT -
        4 * BALL_DISTANCE_FROM_CENTER * Math.sin(Math.PI / 3),
    },
    // 13
    {
      x: 0,
      y: BALL_Y_DEFAULT,
      z:
        BALL_1_Z_DEFAULT -
        4 * BALL_DISTANCE_FROM_CENTER * Math.sin(Math.PI / 3),
    },
    // 14
    {
      x: 2 * BALL_DISTANCE_FROM_CENTER * Math.cos(Math.PI / 3),
      y: BALL_Y_DEFAULT,
      z:
        BALL_1_Z_DEFAULT -
        4 * BALL_DISTANCE_FROM_CENTER * Math.sin(Math.PI / 3),
    },
    // 15
    {
      x: 4 * BALL_DISTANCE_FROM_CENTER * Math.cos(Math.PI / 3),
      y: BALL_Y_DEFAULT,
      z:
        BALL_1_Z_DEFAULT -
        4 * BALL_DISTANCE_FROM_CENTER * Math.sin(Math.PI / 3),
    },
  ],
};
export const GLOBAL_CONSTANTS = {
  IS_DEBUG: false,
  BALL_RADIUS,
  BALL_POSITION,
};
