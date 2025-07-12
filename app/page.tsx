"use client"

import { useState } from "react"
import {
  Calendar,
  Clock,
  Scissors,
  User,
  DollarSign,
  Check,
  Star,
  MapPin,
  Phone,
  Instagram,
  Facebook,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"


function SistemaReservas({ onVolver }: { onVolver: () => void }) {
  const [paso, setPaso] = useState(1)
  const [barberoSeleccionado, setBarberoSeleccionado] = useState("")
  const [servicioSeleccionado, setServicioSeleccionado] = useState("")
  const [fechaSeleccionada, setFechaSeleccionada] = useState("")
  const [horaSeleccionada, setHoraSeleccionada] = useState("")
  const [datosCliente, setDatosCliente] = useState({
    nombre: "",
    telefono: "",
    email: "",
    notas: "",
  })

  
  const barberos = [
    {
      id: 1,
      nombre: "Saul Style",
      especialidad: "Cortes clásicos y barba",
      experiencia: "8 años",
      imagen: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      nombre: "Ramon Rondon",
      especialidad: "Cortes modernos y fade",
      experiencia: "5 años",
      imagen: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      nombre: "El flaco",
      especialidad: "Barbería tradicional",
      experiencia: "12 años",
      imagen: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      nombre: "Enriquez Hotstyle",
      especialidad: "Barbería Principiante",
      experiencia: "2 años",
      imagen: "/placeholder.svg?height=100&width=100",
    },
  ]

  const servicios = [
    { id: 1, nombre: "Corte Clásico", precio: 400, duracion: 30 },
    { id: 2, nombre: "Corte + Barba", precio: 650, duracion: 45 },
    { id: 3, nombre: "Solo Barba", precio: 300, duracion: 20 },
    { id: 4, nombre: "Corte Premium", precio: 800, duracion: 60 },
    { id: 5, nombre: "Corte Niño", precio: 250, duracion: 25 },
    { id: 6, nombre: "Afeitado Clásico", precio: 450, duracion: 35 },
  ]

 
  const horariosDisponibles = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
  ]

  const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

  const servicioInfo = servicios.find((s) => s.id.toString() === servicioSeleccionado)
  const barberoInfo = barberos.find((b) => b.id.toString() === barberoSeleccionado)

  const handleSiguientePaso = () => {
    if (paso < 4) setPaso(paso + 1)
  }

  const handlePasoAnterior = () => {
    if (paso > 1) setPaso(paso - 1)
  }

  const handleConfirmarCita = () => {
    alert("¡Cita confirmada! Te enviaremos un mensaje de confirmación.")
    onVolver()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header con botón volver */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" onClick={onVolver}>
            ← Volver al inicio
          </Button>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Scissors className="h-6 w-6 text-amber-600" />
              <h1 className="text-2xl font-bold text-gray-800">Reservar Cita</h1>
            </div>
          </div>
          <div></div>
        </div>

        {/* Indicador de pasos */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    paso >= num ? "bg-amber-600 text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {paso > num ? <Check className="h-4 w-4" /> : num}
                </div>
                {num < 4 && <div className={`w-12 h-0.5 ${paso > num ? "bg-amber-600" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
        </div>

        {/* Paso 1: Seleccionar Barbero */}
        {paso === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Selecciona tu barbero
              </CardTitle>
              <CardDescription>Elige el profesional que prefieras</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {barberos.map((barbero) => (
                  <div
                    key={barbero.id}
                    onClick={() => setBarberoSeleccionado(barbero.id.toString())}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      barberoSeleccionado === barbero.id.toString()
                        ? "border-amber-600 bg-amber-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-center">
                      <img
                        src={barbero.imagen || "/placeholder.svg"}
                        alt={barbero.nombre}
                        className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                      />
                      <h3 className="font-semibold">{barbero.nombre}</h3>
                      <p className="text-sm text-gray-600">{barbero.especialidad}</p>
                      <Badge variant="secondary" className="mt-2">
                        {barbero.experiencia}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-6">
                <Button
                  onClick={handleSiguientePaso}
                  disabled={!barberoSeleccionado}
                  className="bg-amber-600 hover:bg-amber-700"
                >
                  Continuar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Paso 2: Seleccionar Servicio */}
        {paso === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scissors className="h-5 w-5" />
                Selecciona el servicio
              </CardTitle>
              <CardDescription>Elige el tipo de corte o servicio que deseas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {servicios.map((servicio) => (
                  <div
                    key={servicio.id}
                    onClick={() => setServicioSeleccionado(servicio.id.toString())}
                    className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      servicioSeleccionado === servicio.id.toString()
                        ? "border-amber-600 bg-amber-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div>
                      <h3 className="font-semibold">{servicio.nombre}</h3>
                      <p className="text-sm text-gray-600">{servicio.duracion} minutos</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">RD${servicio.precio}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={handlePasoAnterior}>
                  Anterior
                </Button>
                <Button
                  onClick={handleSiguientePaso}
                  disabled={!servicioSeleccionado}
                  className="bg-amber-600 hover:bg-amber-700"
                >
                  Continuar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Paso 3: Fecha y Hora */}
        {paso === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Selecciona fecha y hora
              </CardTitle>
              <CardDescription>Elige cuándo quieres tu cita</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-base font-medium mb-3 block">Día de la semana</label>
                  <select
                    value={fechaSeleccionada}
                    onChange={(e) => setFechaSeleccionada(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="">Selecciona un día</option>
                    {diasSemana.map((dia) => (
                      <option key={dia} value={dia}>
                        {dia}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-base font-medium mb-3 block">Hora disponible</label>
                  <select
                    value={horaSeleccionada}
                    onChange={(e) => setHoraSeleccionada(e.target.value)}
                    disabled={!fechaSeleccionada}
                    className="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100"
                  >
                    <option value="">Selecciona una hora</option>
                    {horariosDisponibles.map((hora) => (
                      <option key={hora} value={hora}>
                        {hora}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={handlePasoAnterior}>
                  Anterior
                </Button>
                <Button
                  onClick={handleSiguientePaso}
                  disabled={!fechaSeleccionada || !horaSeleccionada}
                  className="bg-amber-600 hover:bg-amber-700"
                >
                  Continuar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Paso 4: Datos y Confirmación */}
        {paso === 4 && (
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Tus datos</CardTitle>
                <CardDescription>Completa la información para confirmar tu cita</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nombre completo *</label>
                  <input
                    type="text"
                    value={datosCliente.nombre}
                    onChange={(e) => setDatosCliente({ ...datosCliente, nombre: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Teléfono *</label>
                  <input
                    type="tel"
                    value={datosCliente.telefono}
                    onChange={(e) => setDatosCliente({ ...datosCliente, telefono: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Tu número de teléfono"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={datosCliente.email}
                    onChange={(e) => setDatosCliente({ ...datosCliente, email: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Notas adicionales</label>
                  <textarea
                    value={datosCliente.notas}
                    onChange={(e) => setDatosCliente({ ...datosCliente, notas: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Alguna preferencia especial..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resumen de tu cita</CardTitle>
                <CardDescription>Revisa los detalles antes de confirmar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <User className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium">{barberoInfo?.nombre}</p>
                    <p className="text-sm text-gray-600">{barberoInfo?.especialidad}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Scissors className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium">{servicioInfo?.nombre}</p>
                    <p className="text-sm text-gray-600">{servicioInfo?.duracion} minutos</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium">{fechaSeleccionada}</p>
                    <p className="text-sm text-gray-600">{horaSeleccionada}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <DollarSign className="h-5 w-5 text-amber-600" />
                  <div>
                    <p className="font-medium">Total a pagar</p>
                    <p className="text-2xl font-bold text-amber-600">RD${servicioInfo?.precio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {paso === 4 && (
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={handlePasoAnterior}>
              Anterior
            </Button>
            <Button
              onClick={handleConfirmarCita}
              disabled={!datosCliente.nombre || !datosCliente.telefono}
              className="bg-green-600 hover:bg-green-700"
            >
              Confirmar Cita
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function LandingPage() {
  const [mostrarReserva, setMostrarReserva] = useState(false)

  const servicios = [
    { nombre: "Corte Clásico", precio: 400, descripcion: "Corte tradicional con tijera y máquina" },
    { nombre: "Corte + Barba", precio: 650, descripcion: "Corte completo más arreglo de barba" },
    { nombre: "Solo Barba", precio: 300, descripcion: "Arreglo y perfilado de barba" },
    { nombre: "Corte Premium", precio: 800, descripcion: "Corte + barba + cejas + mascarilla" },
    { nombre: "Corte Niño", precio: 250, descripcion: "Corte especial para menores de 12 años" },
    { nombre: "Afeitado Clásico", precio: 450, descripcion: "Afeitado tradicional con navaja" },
  ]

  const barberos = [
    {
      nombre: "Saul Style",
      especialidad: "Maestro Barbero",
      experiencia: "8 años",
      rating: 5.0,
      imagen: "/placeholder.svg?height=120&width=120",
    },
    {
      nombre: "Ramon Rondon",
      especialidad: "Especialista en Fade",
      experiencia: "5 años",
      rating: 4.8,
      imagen: "/placeholder.svg?height=120&width=120",
    },
    {
      nombre: "El flaco",
      especialidad: "Barbería Tradicional",
      experiencia: "12 años",
      rating: 5.0,
      imagen: "/placeholder.svg?height=120&width=120",
    },
    {
      nombre: "Enriquez Hotstyle",
      especialidad: "Barbería Principiante",
      experiencia: "2 años",
      rating: 5.0,
      imagen: "/placeholder.svg?height=120&width=120",
    },
  ]

  if (mostrarReserva) {
    return <SistemaReservas onVolver={() => setMostrarReserva(false)} />
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <Scissors className="h-8 w-8 text-amber-600" />
              <span className="text-2xl font-bold text-gray-900">Barbería MVP</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#servicios" className="text-gray-700 hover:text-amber-600 transition-colors">
                Servicios
              </a>
              <a href="#barberos" className="text-gray-700 hover:text-amber-600 transition-colors">
                Barberos
              </a>
              <a href="#contacto" className="text-gray-700 hover:text-amber-600 transition-colors">
                Contacto
              </a>
            </nav>
            <Button onClick={() => setMostrarReserva(true)} className="bg-amber-600 hover:bg-amber-700 text-white">
              Reservar Cita
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Tu Estilo, Nuestra <span className="text-amber-400">Pasión</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Más de 25 años creando el look perfecto para cada cliente
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setMostrarReserva(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg"
            >
              Reservar Ahora
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg bg-transparent"
            >
              Ver Servicios
            </Button>
          </div>
        </div>
      </section>

      {/* Servicios Section */}
      <section id="servicios" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Servicios</h2>
            <p className="text-xl text-gray-600">Calidad profesional a precios accesibles</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicios.map((servicio, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{servicio.nombre}</CardTitle>
                    <Badge className="bg-amber-100 text-amber-800 text-lg font-bold">RD${servicio.precio}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{servicio.descripcion}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Barberos Section */}
      <section id="barberos" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Maestros Barberos</h2>
            <p className="text-xl text-gray-600">Profesionales con años de experiencia</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {barberos.map((barbero, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <img
                    src={barbero.imagen || "/placeholder.svg"}
                    alt={barbero.nombre}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold mb-2">{barbero.nombre}</h3>
                  <p className="text-amber-600 font-medium mb-2">{barbero.especialidad}</p>
                  <p className="text-gray-600 mb-3">{barbero.experiencia} de experiencia</p>
                  <div className="flex items-center justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(barbero.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{barbero.rating}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Horarios Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Horarios de Atención</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Lunes a Viernes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-amber-600">9:00 AM - 7:00 PM</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Sábados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-amber-600">8:00 AM - 6:00 PM</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">¿Listo para tu nuevo look?</h2>
          <p className="text-xl text-amber-100 mb-8">
            Reserva tu cita ahora y experimenta el mejor servicio de barbería
          </p>
          <Button
            size="lg"
            onClick={() => setMostrarReserva(true)}
            className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
          >
            Reservar Mi Cita
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Scissors className="h-6 w-6 text-amber-400" />
                <span className="text-xl font-bold">Barbería MVP</span>
              </div>
              <p className="text-gray-400">
                Tu barbería de confianza desde 2010. Tradición y modernidad en cada corte.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contacto</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-amber-400" />
                  <span className="text-gray-400">Carretera Juan Bosch, Cutupu La Vega</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-amber-400" />
                  <span className="text-gray-400">+1 (849) 401 8813</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
              <div className="flex gap-4">
                <Instagram className="h-6 w-6 text-gray-400 hover:text-amber-400 cursor-pointer" />
                <Facebook className="h-6 w-6 text-gray-400 hover:text-amber-400 cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2025 Barbería MPV. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
