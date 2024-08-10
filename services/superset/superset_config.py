SECRET_KEY = 'superset@#123c1d'

SQLALCHEMY_DATABASE_URI = 'mysql://superset:abc123@mysql:3306/superset'

RATELIMIT_STORAGE_URI = 'redis://redis:6379'

LANGUAGES = {
  'en': {'flag': 'us', 'name': 'English'},
  "zh": {"flag": "cn", "name": "中文"},
}