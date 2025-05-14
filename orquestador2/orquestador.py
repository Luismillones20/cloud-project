from flask import Flask, jsonify, request
import requests
from flasgger import Swagger
from flask_cors import CORS

app = Flask(__name__)
swagger = Swagger(app)
CORS(app)

# Variables de entorno o .env para IPs reales o nombres en Docker network
PERSONA_SERVICE_URL = "http://persona-service:3002/api/personas" # "http://persona-service:3002" # persona-service:3001/api/personas
EXAMEN_SERVICE_URL = "http://historial-service:8084/api/examenes" # http://historial-service:8084 #historial-service:8084/api/examenes
CITAS_SERVICE_URL = "http://api-receta:8000"

# ENDPOINTS MICROSERVICIO CITAS-RECETASdocker build -t luismillones20/orquestador-service:latest .
@app.route('/orquestador/paciente/<dni>', methods=['GET'])
def get_paciente_info(dni):
    #try:
        # Llama al persona-service para obtener info del paciente
    response = requests.get(f"{PERSONA_SERVICE_URL}/paciente/dni/{dni}", timeout=5)

    if response.status_code == 200:
        return jsonify(response.json()), 200
    elif response.status_code == 404:
        return jsonify({"error": f"Paciente con DNI {dni} no encontrado"}), 404
    else:
        return jsonify({"error": f"Error inesperado: {response.status_code}"}), 500

    #except requests.exceptions.RequestException as e:
    #    return jsonify({"error": f"No se pudo conectar al persona-service: {str(e)}"}), 503

@app.route('/orquestador/examenes', methods=['POST'])
def crear_examen_con_validacion():

    data = request.get_json()
    paciente_id = data.get("pacienteId")

    if not paciente_id:
        return jsonify({"error": "El campo pacienteId es obligatorio"}), 400

    # Validar existencia del paciente en persona-service
    #try:
    response = requests.get(f"{PERSONA_SERVICE_URL}/paciente/dni/{paciente_id}")
    if response.status_code != 200:
        return jsonify({"error": f"Paciente con ID {paciente_id} no existe"}), 400
    #except Exception as e:
    #    return jsonify({"error": f"Error al verificar paciente: {str(e)}"}), 500

    # Si existe, redirigir al historial-service para crear el examen
    #try:
    examen_response = requests.post(EXAMEN_SERVICE_URL, json=data)
    return jsonify(examen_response.json()), examen_response.status_code
    #except Exception as e:
    #    return jsonify({"error": f"Error al crear examen: {str(e)}"}), 500


@app.route('/orquestador/citas', methods=['POST'])
def crear_cita_orquestada():
    """
            Crear una nueva cita médica
            ---
            tags:
              - Citas
            parameters:
              - name: body
                in: body
                required: true
                schema:
                  type: object
                  required:
                    - idpaciente
                    - iddoctor
                    - especialidad
                    - fecha_hora
                    - tipo
                  properties:
                    idcita:
                      type: string
                    idpaciente:
                      type: string
                    iddoctor:
                      type: string
                    especialidad:
                      type: string
                    fecha_hora:
                      type: string
                      format: date-time
                    tipo:
                      type: string
            responses:
              201:
                description: Cita creada correctamente
              400:
                description: Faltan campos obligatorios
              500:
                description: Error del servidor
        """
    #try:
    response = requests.post(f"{CITAS_SERVICE_URL}/generarcita", json=request.get_json(), timeout=5)
    return jsonify(response.json()), response.status_code
    #except requests.exceptions.RequestException as e:
    #    return jsonify({'error': f"Error al comunicarse con citas-service: {str(e)}"}), 503
@app.route('/orquestador/citas/<string:idcita>', methods=['GET'])
def obtener_cita_orquestada(idcita):
    """
       Obtener una cita por ID
       ---
       tags:
         - Citas
       parameters:
         - name: idcita
           in: path
           type: string
           required: true
       responses:
         200:
           description: Cita encontrada
         400:
           description: Cita no encontrada
       """
    #try:
    response = requests.get(f"{CITAS_SERVICE_URL}/getcita/{idcita}", timeout=5)
    return jsonify(response.json()), response.status_code
    #except requests.exceptions.RequestException as e:
    #    return jsonify({'error': f"Error al comunicarse con citas-service: {str(e)}"}), 503
@app.route('/orquestador/citas/paciente/<string:idpaciente>', methods=['GET'])
def obtener_citas_paciente_orquestada(idpaciente):
    """
        Obtener todas las citas de un paciente
        ---
        tags:
          - Citas
        parameters:
          - name: idpaciente
            in: path
            type: string
            required: true
        responses:
          200:
            description: Lista de citas del paciente
          400:
            description: No se encontraron citas para el paciente
        """
    #try:
    response = requests.get(f"{CITAS_SERVICE_URL}/getcita/paciente/{idpaciente}", timeout=5)
    return jsonify(response.json()), response.status_code
    #except requests.exceptions.RequestException as e:
    #    return jsonify({'error': f"Error al comunicarse con citas-service: {str(e)}"}), 503

@app.route('/orquestador/citas/doctor/<string:iddoctor>', methods=['GET'])
def obtener_citas_doctor_orquestada(iddoctor):
    """
        Obtener todas las citas de un doctor
        ---
        tags:
          - Citas
        parameters:
          - name: iddoctor
            in: path
            type: string
            required: true
        responses:
          200:
            description: Lista de citas del doctor
          400:
            description: No se encontraron citas para el doctor
        """
    #try:
    response = requests.get(f"{CITAS_SERVICE_URL}/getcitas/doctor/{iddoctor}", timeout=5)
    return jsonify(response.json()), response.status_code
    #except requests.exceptions.RequestException as e:
    #    return jsonify({'error': f"Error al comunicarse con citas-service: {str(e)}"}), 503

@app.route('/orquestador/citas/hoy', methods=['GET'])
def obtener_citas_hoy_orquestada():
    """
        Obtener citas para el día de hoy
        ---
        tags:
          - Citas
        responses:
          200:
            description: Lista de citas para hoy
          400:
            description: No hay citas programadas para hoy
        """
    #try:
    response = requests.get(f"{CITAS_SERVICE_URL}/getcita/hoy", timeout=5)
    return jsonify(response.json()), response.status_code
    #except requests.exceptions.RequestException as e:
    #    return jsonify({'error': f"Error al comunicarse con citas-service: {str(e)}"}), 503


@app.route('/orquestador/generarreceta', methods=['POST'])
def generar_receta_orquestada():
    """
    Generar una nueva receta médica
    ---
    tags:
      - Recetas
    parameters:
      - name: body
        in: body
        required: true
        schema:
          type: object
          required:
            - idcita
            - medicamentos
            - idpaciente
            - iddoctor
            - diagnostico
            - requiere_examen_medico
          properties:
            idcita:
              type: string
            medicamentos:
              type: string
            idpaciente:
              type: string
            iddoctor:
              type: string
            diagnostico:
              type: string
            requiere_examen_medico:
              type: boolean
            duracion:
              type: string
            observaciones:
              type: string
    responses:
      201:
        description: Receta creada correctamente
      400:
        description: Faltan campos obligatorios
      500:
        description: Error del servidor
    """
    data = request.get_json()
    campos = ['idcita', 'medicamentos', 'idpaciente', 'iddoctor', 'diagnostico', 'requiere_examen_medico']
    if not all(c in data for c in campos):
        return jsonify({'error': 'Faltan campos obligatorios'}), 400

    idpaciente_dni = data['idpaciente']   # En tu modelo, idpaciente = dni del paciente
    iddoctor_dni = data['iddoctor']       # En tu modelo, iddoctor = dni del médico
    idcita = data['idcita']

    #try:
        # 👉 Verificar paciente por DNI
    paciente_response = requests.get(
        f"{PERSONA_SERVICE_URL}/paciente/dni/{idpaciente_dni}",
        timeout=5
    )
    if paciente_response.status_code != 200:
        return jsonify({'error': f'Paciente con DNI {idpaciente_dni} no existe'}), 400

        # 👉 Verificar doctor por DNI
    doctor_response = requests.get(
        f"{PERSONA_SERVICE_URL}/medico/dni/{iddoctor_dni}",
        timeout=5
    )
    if doctor_response.status_code != 200:
        return jsonify({'error': f'Doctor con DNI {iddoctor_dni} no existe'}), 400

    # 👉 Verificar existencia de cita
    cita_response = requests.get(
        f"{CITAS_SERVICE_URL}/getcita/{idcita}",
        timeout=5
    )
    if cita_response.status_code != 200:
        return jsonify({'error': f'Cita con ID {idcita} no existe'}), 400

    # 👉 Si todo OK, reenvía la receta a receta-cita-service
    receta_response = requests.post(
        f"{CITAS_SERVICE_URL}/generarreceta",
        json=data,
        timeout=5
    )
    return jsonify(receta_response.json()), receta_response.status_code

    #except requests.exceptions.RequestException as e:
    #    return jsonify({'error': f"Error al comunicarse con un microservicio: {str(e)}"}), 503

@app.route('/orquestador/recetas/paciente/<string:idpaciente>', methods=['GET'])
def obtener_recetas_paciente_orquestada(idpaciente):
    """
        Obtener recetas por ID de paciente
        ---
        tags:
          - Recetas
        parameters:
          - name: idpaciente
            in: path
            type: string
            required: true
        responses:
          200:
            description: Lista de recetas
          400:
            description: No se encontraron recetas para este paciente
        """

    response = requests.get(f"{CITAS_SERVICE_URL}/getrecetas/paciente/{idpaciente}", timeout=5)
    return jsonify(response.json()), response.status_code


@app.route('/orquestador/recetas/cita/<string:idcita>', methods=['GET'])
def obtener_receta_cita_orquestada(idcita):
    """
        Obtener receta por ID de cita
        ---
        tags:
          - Recetas
        parameters:
          - name: idcita
            in: path
            type: string
            required: true
        responses:
          200:
            description: Receta encontrada
          400:
            description: No se encontró receta para esta cita
        """

    response = requests.get(f"{CITAS_SERVICE_URL}/getreceta/cita/{idcita}", timeout=5)
    return jsonify(response.json()), response.status_code


# ENDPOINTS MICROSERVICIO EXAMEN_SERVICE

@app.route('/orquestador/examenes/buscar', methods=['GET'])
def buscar_examenes():
    """
        Buscar exámenes médicos
        ---
        tags:
          - Exámenes
        parameters:
          - name: pacienteId
            in: query
            type: string
            required: false
            description: ID del paciente
          - name: citaId
            in: query
            type: string
            required: false
            description: ID de la cita médica
          - name: medicoId
            in: query
            type: string
            required: false
            description: ID del médico
        responses:
          200:
            description: Lista de exámenes encontrados
          400:
            description: Petición inválida
          500:
            description: Error interno del servidor
        """
    #try:
    params = {
        'pacienteId': request.args.get('pacienteId'),
        'citaId': request.args.get('citaId'),
        'medicoId': request.args.get('medicoId')
    }
    response = requests.get(f"{EXAMEN_SERVICE_URL}/buscar", params=params)        #return jsonify(response.json()), response.status_code
    if response.headers.get("Content-Type", "").startswith("application/json"):
        return jsonify(response.json()), response.status_code
    else:
        return jsonify({"error": "Respuesta no contiene JSON", "raw": response.text}), response.status_code
        #except requests.exceptions.RequestException as e:


        ##return jsonify({'error': f"Error al comunicarse con historial-service: {str(e)}"}), 503

@app.route('/orquestador/examenes/paciente/<string:pacienteId>', methods=['GET'])
def obtener_examenes_paciente(pacienteId):
    """
        Obtener exámenes médicos de un paciente
        ---
        tags:
          - Exámenes
        parameters:
          - name: pacienteId
            in: path
            type: string
            required: true
            description: ID del paciente
        responses:
          200:
            description: Lista de exámenes encontrados
            schema:
              type: array
              items:
                type: object
                properties:
                  pacienteId:
                    type: string
                  especialidad:
                    type: string
                  diagnostico:
                    type: string
                  medicoId:
                    type: string
                  citaId:
                    type: string
                  fecha:
                    type: string
                    format: date-time
          400:
            description: Petición inválida
          503:
            description: Error de comunicación con historial-service
        """
    response = requests.get(f"{EXAMEN_SERVICE_URL}/{pacienteId}", timeout=5)
    return jsonify(response.json()), response.status_code

@app.route('/orquestador/examenes', methods=['POST'])
def crear_examen_orquestado():
    """
    Crear un examen médico orquestado
    ---
    tags:
      - Exámenes
    description: Valida la existencia del paciente y médico en persona-service antes de crear el examen en historial-service.
    parameters:
      - in: body
        name: body
        required: true
        schema:
          type: object
          required:
            - pacienteId
            - medicoId
            - citaId
            - descripcion
            - resultado
          properties:
            pacienteId:
              type: string
              description: DNI del paciente
            medicoId:
              type: string
              description: DNI del médico
            citaId:
              type: string
              description: ID de la cita médica
            descripcion:
              type: string
              description: Descripción del examen
            resultado:
              type: string
              description: Resultado del examen
    responses:
      201:
        description: Examen creado correctamente
      400:
        description: Faltan campos obligatorios o paciente/médico no encontrados
      503:
        description: Error al comunicarse con un microservicio
    """
    data = request.get_json()
    required_fields = ['pacienteId', 'medicoId', 'citaId', 'descripcion', 'resultado']  # ajusta según tu modelo ExamenMedico

    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Faltan campos obligatorios'}), 400

    paciente_dni = data['pacienteId']   # Tu modelo usa pacienteId como DNI
    medico_dni = data['medicoId']       # Igual para medicoId como DNI


    # 👉 Verificar paciente en persona-service
    paciente_response = requests.get(
        f"{PERSONA_SERVICE_URL}/paciente/dni/{paciente_dni}",
        timeout=5
    )
    if paciente_response.status_code != 200:
        return jsonify({'error': f'Paciente con DNI {paciente_dni} no existe'}), 400

    # 👉 Verificar médico en persona-service
    doctor_response = requests.get(
        f"{PERSONA_SERVICE_URL}/medico/dni/{medico_dni}",
        timeout=5
    )
    if doctor_response.status_code != 200:
        return jsonify({'error': f'Médico con DNI {medico_dni} no existe'}), 400

    # 👉 Si todo OK, llamar a historial-service para crear examen
    examen_response = requests.post(
        f"{EXAMEN_SERVICE_URL}",
        json=data,
        timeout=5
    )
    return jsonify(examen_response.json()), examen_response.status_code

# MICROSERVICIO PERSONA
# Obtener paciente por ID
@app.route('/orquestador/personas/paciente/<int:id>', methods=['GET'])
def obtener_paciente(id):
    response = requests.get(f"{PERSONA_SERVICE_URL}/paciente/{id}", timeout=5)
    return jsonify(response.json()), response.status_code

# Obtener médico por ID
@app.route('/orquestador/personas/medico/<int:id>', methods=['GET'])
def obtener_medico(id):
    """
        Obtener información básica de un médico por ID
        ---
        tags:
          - Personas
        parameters:
          - name: id
            in: path
            type: integer
            required: true
            description: ID del médico
        responses:
          200:
            description: Información básica del médico encontrada
            schema:
              type: object
              properties:
                nombres:
                  type: string
                apellidos:
                  type: string
                telefono:
                  type: string
                email:
                  type: string
                especialidad:
                  type: string
          404:
            description: Médico no encontrado
          503:
            description: Error al comunicarse con persona-service
        """
    response = requests.get(f"{PERSONA_SERVICE_URL}/medico/{id}", timeout=5)
    return jsonify(response.json()), response.status_code

# Obtener paciente por DNI
@app.route('/orquestador/personas/paciente/dni/<string:dni>', methods=['GET'])
def obtener_paciente_dni(dni):
    """
        Obtener información básica de un paciente por DNI
        ---
        tags:
          - Personas
        parameters:
          - name: dni
            in: path
            type: string
            required: true
            description: DNI del paciente
        responses:
          200:
            description: Información básica del paciente encontrada
            schema:
              type: object
              properties:
                nombres:
                  type: string
                  description: Nombres del paciente
                apellidos:
                  type: string
                  description: Apellidos del paciente
                tipoSangre:
                  type: string
                  description: Tipo de sangre del paciente
                email:
                  type: string
                  description: Correo electrónico del paciente
                telefono:
                  type: string
                  description: Teléfono de contacto del paciente
          404:
            description: Paciente no encontrado
          503:
            description: Error al comunicarse con persona-service
        """
    response = requests.get(f"{PERSONA_SERVICE_URL}/paciente/dni/{dni}", timeout=5)
    return jsonify(response.json()), response.status_code

# Obtener médico por DNI
@app.route('/orquestador/personas/medico/dni/<string:dni>', methods=['GET'])
def obtener_medico_dni(dni):
    """
        Obtener información básica de un médico por DNI
        ---
        tags:
          - Personas
        parameters:
          - name: dni
            in: path
            type: string
            required: true
            description: DNI del médico
        responses:
          200:
            description: Información básica del médico encontrada
            schema:
              type: object
              properties:
                nombres:
                  type: string
                  description: Nombres del médico
                apellidos:
                  type: string
                  description: Apellidos del médico
                telefono:
                  type: string
                  description: Teléfono del médico
                email:
                  type: string
                  description: Correo electrónico del médico
                especialidad:
                  type: string
                  description: Especialidad médica
          404:
            description: Médico no encontrado
          503:
            description: Error al comunicarse con persona-service
        """
    response = requests.get(f"{PERSONA_SERVICE_URL}/medico/dni/{dni}", timeout=5)
    return jsonify(response.json()), response.status_code

# Buscar médicos por especialidad y día
@app.route('/orquestador/personas/medicos', methods=['GET'])
def buscar_medicos():
    """
        Buscar médicos
        ---
        tags:
          - Personas
        parameters:
          - name: especialidad
            in: query
            type: string
            required: false
            description: Especialidad médica para filtrar
          - name: dia
            in: query
            type: string
            required: false
            description: Día de disponibilidad para filtrar
        responses:
          200:
            description: Lista de médicos encontrados
            schema:
              type: array
              items:
                type: object
                properties:
                  nombres:
                    type: string
                  apellidos:
                    type: string
                  telefono:
                    type: string
                  email:
                    type: string
                  especialidad:
                    type: string
          503:
            description: Error al comunicarse con persona-service
        """
    params = {
        'especialidad': request.args.get('especialidad'),
        'dia': request.args.get('dia')
    }
    response = requests.get(f"{PERSONA_SERVICE_URL}/medicos", params=params, timeout=5)
    return jsonify(response.json()), response.status_code


# Crear paciente
@app.route('/orquestador/personas/paciente', methods=['POST'])
def crear_paciente():
    """
        Crear un nuevo paciente
        ---
        tags:
          - Personas
        parameters:
          - in: body
            name: body
            required: true
            schema:
              type: object
              required:
                - dni
                - password
                - nombres
                - apellidos
                - fechaNacimiento
                - sexo
                - direccion
                - telefono
                - email
              properties:
                dni:
                  type: string
                  description: DNI del paciente (8 dígitos)
                password:
                  type: string
                  description: Contraseña del paciente (mínimo 8 caracteres)
                nombres:
                  type: string
                  description: Nombres del paciente
                apellidos:
                  type: string
                  description: Apellidos del paciente
                fechaNacimiento:
                  type: string
                  format: date
                  description: Fecha de nacimiento (YYYY-MM-DD)
                sexo:
                  type: string
                  description: Sexo del paciente (Masculino, Femenino, Prefiero no decir)
                direccion:
                  type: string
                  description: Dirección del paciente
                telefono:
                  type: string
                  description: Teléfono del paciente
                email:
                  type: string
                  description: Correo electrónico del paciente
                seguroSalud:
                  type: boolean
                  description: Indica si tiene seguro de salud (opcional)
                estadoCivil:
                  type: string
                  description: Estado civil del paciente (opcional)
                tipoSangre:
                  type: string
                  description: Tipo de sangre del paciente (opcional)
        responses:
          201:
            description: Paciente creado correctamente
          400:
            description: Error en los datos enviados
          503:
            description: Error al comunicarse con persona-service
        """
    try:
        response = requests.post(f"{PERSONA_SERVICE_URL}/paciente", json=request.get_json(), timeout=5)
        return jsonify(response.json()), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 503

# Crear médico
@app.route('/orquestador/personas/medico', methods=['POST'])
def crear_medico():
    """
        Crear un nuevo médico
        ---
        tags:
          - Personas
        parameters:
          - in: body
            name: body
            required: true
            schema:
              type: object
              required:
                - dni
                - password
                - nombres
                - apellidos
                - telefono
                - email
                - especialidad
                - colegiatura
                - direccion
                - sexo
                - fechaNacimiento
                - horario
              properties:
                dni:
                  type: string
                  description: DNI del médico (8 dígitos)
                password:
                  type: string
                  description: Contraseña del médico (mínimo 8 caracteres)
                nombres:
                  type: string
                  description: Nombres del médico
                apellidos:
                  type: string
                  description: Apellidos del médico
                telefono:
                  type: string
                  description: Número de teléfono
                email:
                  type: string
                  description: Correo electrónico
                especialidad:
                  type: string
                  description: Especialidad médica
                colegiatura:
                  type: string
                  description: Número de colegiatura
                direccion:
                  type: string
                  description: Dirección del médico
                sexo:
                  type: string
                  description: Sexo (Masculino, Femenino, Prefiero no decir)
                fechaNacimiento:
                  type: string
                  format: date
                  description: Fecha de nacimiento (YYYY-MM-DD)
                horario:
                  type: array
                  description: Horario del médico (días y turnos)
                  items:
                    type: object
                    properties:
                      dia:
                        type: string
                        description: Día de la semana
                      turnos:
                        type: array
                        items:
                          type: object
                          properties:
                            inicio:
                              type: string
                              description: Hora inicio turno (HH:mm)
                            fin:
                              type: string
                              description: Hora fin turno (HH:mm)
        responses:
          201:
            description: Médico creado correctamente
          400:
            description: Error en datos enviados
          503:
            description: Error al comunicarse con persona-service
        """
    response = requests.post(f"{PERSONA_SERVICE_URL}/medico", json=request.get_json(), timeout=5)
    return jsonify(response.json()), response.status_code

# Actualizar paciente
@app.route('/orquestador/personas/paciente/<int:id>', methods=['PUT'])
def actualizar_paciente(id):
    response = requests.put(f"{PERSONA_SERVICE_URL}/paciente/{id}", json=request.get_json(), timeout=5)
    return jsonify(response.json()), response.status_code

# Actualizar médico
@app.route('/orquestador/personas/medico/<int:id>', methods=['PUT'])
def actualizar_medico(id):
        response = requests.put(f"{PERSONA_SERVICE_URL}/medico/{id}", json=request.get_json(), timeout=5)
        return jsonify(response.json()), response.status_code


# Eliminar paciente
@app.route('/orquestador/personas/paciente/<int:id>', methods=['DELETE'])
def eliminar_paciente(id):
    response = requests.delete(f"{PERSONA_SERVICE_URL}/paciente/{id}", timeout=5)
    return jsonify(response.json()), response.status_code

# Eliminar médico
@app.route('/orquestador/personas/medico/<int:id>', methods=['DELETE'])
def eliminar_medico(id):
    response = requests.delete(f"{PERSONA_SERVICE_URL}/medico/{id}", timeout=5)
    return jsonify(response.json()), response.status_code
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8002)
