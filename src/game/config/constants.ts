// Player
export const PLAYER_RADIUS = 20
export const PLAYER_COLOR = 0x60c659 // guri-green-500
export const PLAYER_SPEED = 200

// Joystick
export const JOYSTICK_BASE_RADIUS = 60
export const JOYSTICK_THUMB_RADIUS = 30
export const JOYSTICK_BASE_COLOR = 0x888888
export const JOYSTICK_THUMB_COLOR = 0xcccccc
export const JOYSTICK_BASE_ALPHA = 0.5
export const JOYSTICK_THUMB_ALPHA = 0.7
export const JOYSTICK_FORCE_MIN = 16
export const JOYSTICK_MARGIN = 120

// Enemy
export const ENEMY_SIZE = 28
export const ENEMY_COLOR = 0xe63946
export const ENEMY_SPEED = 80
export const ENEMY_SPAWN_INTERVAL = 2000
export const ENEMY_SPAWN_DISTANCE = 400 // distance outside camera view
export const ENEMY_DAMAGE = 10
export const ENEMY_DAMAGE_COOLDOWN = 500 // ms between hits

// Player Health
export const PLAYER_MAX_HEALTH = 100

// Health Bar
export const HEALTH_BAR_WIDTH = 200
export const HEALTH_BAR_HEIGHT = 16
export const HEALTH_BAR_Y = 30
export const HEALTH_BAR_BG_COLOR = 0x333333
export const HEALTH_BAR_FG_COLOR = 0x60c659
export const HEALTH_BAR_LOW_COLOR = 0xe63946

// Projectile
export const PROJECTILE_RADIUS = 6
export const PROJECTILE_COLOR = 0xf1fa8c
export const PROJECTILE_SPEED = 400
export const PROJECTILE_BASE_DAMAGE = 1
export const PROJECTILE_BASE_FIRE_RATE = 1000 // ms between shots
export const PROJECTILE_FIRE_RATE_UPGRADE = 150 // ms reduction per upgrade
export const PROJECTILE_DAMAGE_UPGRADE = 1 // extra damage per upgrade
export const PROJECTILE_RANGE = 600 // max travel distance before destroy

// XP / Level
export const XP_GEM_RADIUS = 6
export const XP_GEM_COLOR = 0x3a75c4 // guri-blue-500
export const XP_GEM_VALUE = 1
export const XP_PER_LEVEL = 5 // XP needed to level up (increases each level)
export const XP_COLLECT_RADIUS = 50 // auto-collect distance

// XP Bar
export const XP_BAR_WIDTH = 200
export const XP_BAR_HEIGHT = 8
export const XP_BAR_Y = 52
export const XP_BAR_BG_COLOR = 0x333333
export const XP_BAR_FG_COLOR = 0x3a75c4

// Ground
export const GROUND_TILE_SIZE = 64
export const GROUND_COLOR_PRIMARY = 0x2d5a1b
export const GROUND_COLOR_SECONDARY = 0x3a6b2a
