document.addEventListener('DOMContentLoaded', function() {
    // 1. Obtención de Elementos del DOM (Variables del Scope Principal)
    const form = document.getElementById('registroForm');
    const emailInput = document.getElementById('email');
    const telefonoInput = document.getElementById('telefono');
    const fechaNacimientoInput = document.getElementById('fechaNacimiento');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const inputFoto = document.getElementById('subir-foto');
    const vistaPrevia = document.getElementById('vista-previa');
    const selectorSpan = document.querySelector('.selector-foto span');
    const ubicacionInfoDiv = document.getElementById('ubicacionInfo');
    const obtenerUbicacionBtn = document.getElementById('obtenerUbicacionBtn');
    const nivelEducativoSelect = document.getElementById('nivelEducativo');
    const campoEstudioInput = document.getElementById('campoEstudio'); // 'Qué deseas estudiar'
    const campoEnsenanzaInput = document.getElementById('campoEnsenanza'); // 'Qué deseas enseñar'

    // --- Funciones de Validación ---

    /**
     * @description Valida el formato del correo electrónico usando una RegEx.
     */
    function validarEmail() {
        const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!regexEmail.test(emailInput.value)) {
            emailInput.setCustomValidity("Por favor, ingresa un correo electrónico válido.");
        } else {
            emailInput.setCustomValidity("");
        }
    }

    /**
     * @description Valida que la fecha de nacimiento indique que el usuario es mayor de 18 años.
     * Requiere un elemento con id='resultadoEdad' en el HTML para mostrar el mensaje.
     */
    function validarFechaNacimiento() {
        const fechaNacimientoStr = fechaNacimientoInput.value;
        const resultadoEdadDiv = document.getElementById('resultadoEdad'); // Asumo que tienes un div para esto

        if (!fechaNacimientoStr) {
            fechaNacimientoInput.setCustomValidity("Debes ingresar tu fecha de nacimiento.");
            if (resultadoEdadDiv) resultadoEdadDiv.innerHTML = "";
            return;
        }

        const fechaNacimientoDate = new Date(fechaNacimientoStr);
        const hoy = new Date();
        const edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
        const mes = hoy.getMonth() - fechaNacimientoDate.getMonth();
        
        // Ajuste si aún no ha cumplido años este mes
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimientoDate.getDate())) {
            edad--;
        }

        if (edad < 18) {
            fechaNacimientoInput.setCustomValidity("Debes ser mayor de 18 años para registrarte.");
            if (resultadoEdadDiv) resultadoEdadDiv.innerHTML = "<p class='text-danger mt-1'>❌ Eres menor de edad (se requiere 18+).</p>";
        } else {
            fechaNacimientoInput.setCustomValidity("");
            if (resultadoEdadDiv) resultadoEdadDiv.innerHTML = "<p class='text-success mt-1'>✅ Eres mayor de edad.</p>";
        }
    }

    /**
     * @description Valida que el teléfono tenga exactamente 10 dígitos numéricos.
     */
    function validarTelefono() {
        const regexTelefono = /^[0-9]{10}$/;
        if (!regexTelefono.test(telefonoInput.value)) {
            telefonoInput.setCustomValidity("El teléfono debe tener exactamente 10 dígitos.");
        } else {
            telefonoInput.setCustomValidity("");
        }
    }

    /**
     * @description Valida que la contraseña tenga al menos 8 caracteres.
     */
    function validarContrasena() {
        if (passwordInput.value.length < 8) {
            passwordInput.setCustomValidity("La contraseña debe tener al menos 8 caracteres.");
        } else {
            passwordInput.setCustomValidity("");
        }
        // Llama a la confirmación para actualizar su estado si la contraseña cambia
        validarConfirmacionContrasena();
    }

    /**
     * @description Valida que la contraseña y su confirmación coincidan.
     */
    function validarConfirmacionContrasena() {
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordInput.setCustomValidity("Las contraseñas no coinciden.");
        } else {
            confirmPasswordInput.setCustomValidity("");
        }
    }
    
    /**
     * @description Valida si el campo 'Qué deseas estudiar' está vacío.
     */
    function validarCampoEstudio() {
        if (!campoEstudioInput.value.trim()) {
            campoEstudioInput.setCustomValidity("Por favor, ingresa el campo que deseas estudiar.");
        } else {
            campoEstudioInput.setCustomValidity("");
        }
    }

    /**
     * @description Valida si el campo 'Qué deseas enseñar' está vacío.
     */
    function validarCampoEnsenanza() {
        if (!campoEnsenanzaInput.value.trim()) {
            campoEnsenanzaInput.setCustomValidity("Por favor, ingresa el campo que deseas enseñar.");
        } else {
            campoEnsenanzaInput.setCustomValidity("");
        }
    }
    
    // --- Eventos del Formulario y Validaciones ---

    // 2. Evento de Envío (Submit)
    form.addEventListener('submit', function(event) {
        // Ejecuta todas las validaciones antes de revisar checkValidity()
        validarEmail();
        validarTelefono();
        validarContrasena();
        validarConfirmacionContrasena();
        validarFechaNacimiento();
        validarCampoEstudio();
        validarCampoEnsenanza();
        
        // Verifica si el formulario es válido (incluyendo las validaciones de setCustomValidity)
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            // Si es válido, se podría proceder con el registro (simulado aquí)
            event.preventDefault(); // Previene el envío real por ser demo
            
            // Lógica de registro/JSON (reubicada y simplificada)
            const usuario = {
                nombre: document.getElementById('nombre').value,
                email: emailInput.value,
                telefono: telefonoInput.value,
                nivelEducativo: nivelEducativoSelect.value,
                campoEstudio: campoEstudioInput.value,
                campoEnsenanza: campoEnsenanzaInput.value,
                // No se guardan contraseñas aquí, solo fines de demo
            };
            
            console.log('Usuario a registrar (JSON):', JSON.stringify(usuario, null, 2));

            // Simulación de éxito (Asegúrate de tener un contenedor para alertas)
            const alertContainer = document.querySelector('.card-body'); // Usaremos el body de la tarjeta
            alertContainer.insertAdjacentHTML('afterbegin', `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    🎉 ¡Registro exitoso! Datos listos para ser enviados.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `);
            form.classList.remove('was-validated'); // Opcional: para que no muestre errores al limpiar
            form.reset();
        }

        // Aplica la clase de validación de Bootstrap para mostrar feedback visual
        form.classList.add('was-validated');
    }, false);

    // 3. Eventos para Validación en Tiempo Real (Input/Change)
    emailInput.addEventListener('input', validarEmail);
    telefonoInput.addEventListener('input', validarTelefono);
    passwordInput.addEventListener('input', validarContrasena);
    confirmPasswordInput.addEventListener('input', validarConfirmacionContrasena);
    fechaNacimientoInput.addEventListener('change', validarFechaNacimiento);
    campoEstudioInput.addEventListener('input', validarCampoEstudio);
    campoEnsenanzaInput.addEventListener('input', validarCampoEnsenanza);

    // --- Funcionalidades Adicionales ---

    // 4. Vista Previa de la Foto de Perfil
    inputFoto.addEventListener('change', function() {
        const archivo = this.files[0];
        if (archivo) {
            const lector = new FileReader();
            lector.onload = function(evento) {
                vistaPrevia.src = evento.target.result;
                vistaPrevia.style.display = 'block';
                selectorSpan.textContent = 'Cambiar foto';
            };
            lector.readAsDataURL(archivo);
        } else {
            vistaPrevia.src = '#';
            vistaPrevia.style.display = 'none';
            selectorSpan.textContent = 'Seleccionar foto';
        }
    });

    // 5. Geolocalización
    obtenerUbicacionBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            ubicacionInfoDiv.textContent = "Obteniendo ubicación...";
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitud = position.coords.latitude;
                    const longitud = position.coords.longitude;
                    ubicacionInfoDiv.innerHTML = `
                        <p class="mb-0"><strong>Latitud:</strong> ${latitud.toFixed(4)}</p>
                        <p class="mb-0"><strong>Longitud:</strong> ${longitud.toFixed(4)}</p>
                    `;
                },
                (error) => {
                    let mensajeError;
                    switch(error.code) {
                        case error.PERMISSION_DENIED:
                            mensajeError = "El usuario denegó la solicitud de geolocalización.";
                            break;
                        case error.POSITION_UNAVAILABLE:
                            mensajeError = "La información de ubicación no está disponible.";
                            break;
                        case error.TIMEOUT:
                            mensajeError = "La solicitud de ubicación ha caducado.";
                            break;
                        default:
                            mensajeError = "Ha ocurrido un error desconocido.";
                            break;
                    }
                    ubicacionInfoDiv.textContent = mensajeError;
                }
            );
        } else {
            ubicacionInfoDiv.textContent = "Tu navegador no soporta la API de Geolocalización.";
        }
    });
    
    // 6. Mensaje del Nivel Educativo (Opcional, se integra en el evento 'change')
    nivelEducativoSelect.addEventListener('change', function() {
        const resultadoDiv = document.getElementById('resultadoNivelEducativo'); // Asumo un div en el HTML
        if (resultadoDiv) {
            if (this.value) {
                resultadoDiv.textContent = `Nivel seleccionado: ${this.value}`;
            } else {
                resultadoDiv.textContent = "Por favor, selecciona un nivel educativo.";
            }
        }
    });
});


















































