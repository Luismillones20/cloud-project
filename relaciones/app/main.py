from fastapi import FastAPI
from app.database import engine, Base
from app.controllers import cita_controller, receta_controller

app = FastAPI(title="Microservicio Citas")

Base.metadata.create_all(bind=engine)

app.include_router(cita_controller.router)
app.include_router(receta_controller.router)