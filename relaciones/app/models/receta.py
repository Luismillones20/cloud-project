from sqlalchemy import Column, Integer, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Receta(Base):
    __tablename__ = "recetas"

    idreceta = Column(Integer, primary_key=True, index=True)
    idcita = Column(Integer, ForeignKey("citas.idcita"), unique=True, nullable=False)
    descripcion = Column(Text, nullable=False)
    medicamentos = Column(Text, nullable=False)
    indicaciones = Column(Text, nullable=True)

    cita = relationship("Cita", back_populates="receta")