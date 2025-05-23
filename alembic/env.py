# Alembic environment setup (to be customized)
from conv_backend.models import Base
from conv_backend.config import DATABASE_URL

target_metadata = Base.metadata
