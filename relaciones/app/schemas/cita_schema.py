
from pydantic import BaseModel
from datetime import datetime

class CitaBase(BaseModel):
    idpaciente: int
    iddoctor: int
    especialidad: str
    fecha_hora: datetime
    tipo_cita: str

class CitaCreate(CitaBase):
    pass

class CitaResponse(CitaBase):
    idcita: int

    class Config:
        orm_mode = True