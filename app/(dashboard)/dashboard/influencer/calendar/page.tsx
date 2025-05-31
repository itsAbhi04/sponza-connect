"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import { format, parse, startOfWeek, getDay } from "date-fns"
import { enUS } from "date-fns/locale"
import { CalendarIcon, Clock, Target, AlertCircle, Plus, Filter, X } from "lucide-react"
import { EnhancedInfluencerLayout } from "@/components/layouts/enhanced-influencer-layout"
import "react-big-calendar/lib/css/react-big-calendar.css"

const locales = {
  "en-US": enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

interface CalendarEvent {
  id: string
  title: string
  brand: string
  start: Date
  end: Date
  type: "campaign" | "milestone"
  status?: string
  description?: string
}

export default function InfluencerCalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [view, setView] = useState<"month" | "week" | "day">("month")
  const [date, setDate] = useState(new Date())
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "campaigns" | "milestones">("all")

  useEffect(() => {
    fetchCalendarData()
  }, [date])

  const fetchCalendarData = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/influencer/calendar?month=${date.getMonth()}&year=${date.getFullYear()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        const formattedEvents = data.events.map((event: any) => ({
          ...event,
          start: new Date(event.startDate || event.date),
          end: new Date(event.endDate || event.date),
        }))
        setEvents(formattedEvents)
      }
    } catch (error) {
      console.error("Failed to fetch calendar data:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredEvents = events.filter((event) => {
    if (filter === "all") return true
    if (filter === "campaigns") return event.type === "campaign"
    if (filter === "milestones") return event.type === "milestone"
    return true
  })

  const eventStyleGetter = (event: CalendarEvent) => {
    let backgroundColor = "#3174ad"

    if (event.type === "campaign") {
      backgroundColor = "#10b981"
    } else if (event.type === "milestone") {
      backgroundColor = "#f59e0b"
    }

    return {
      style: {
        backgroundColor,
        borderRadius: "6px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
      },
    }
  }

  const upcomingEvents = events
    .filter((event) => new Date(event.start) > new Date())
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    .slice(0, 5)

  return (
    <EnhancedInfluencerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
            <p className="text-gray-600">Manage your campaigns and deadlines</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => setFilter(filter === "all" ? "campaigns" : "all")}>
              <Filter className="h-4 w-4 mr-2" />
              {filter === "all" ? "All Events" : filter === "campaigns" ? "Campaigns" : "Milestones"}
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {events.filter((e) => e.type === "campaign" && new Date(e.end) > new Date()).length}
                  </p>
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Upcoming Deadlines</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      events.filter(
                        (e) =>
                          e.type === "milestone" &&
                          new Date(e.start) > new Date() &&
                          new Date(e.start) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                      ).length
                    }
                  </p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      events.filter(
                        (e) =>
                          new Date(e.start).getMonth() === new Date().getMonth() &&
                          new Date(e.start).getFullYear() === new Date().getFullYear(),
                      ).length
                    }
                  </p>
                </div>
                <CalendarIcon className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Overdue</p>
                  <p className="text-2xl font-bold text-red-600">
                    {events.filter((e) => e.type === "milestone" && new Date(e.start) < new Date()).length}
                  </p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Campaign Calendar</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={view === "month" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setView("month")}
                    >
                      Month
                    </Button>
                    <Button variant={view === "week" ? "default" : "outline"} size="sm" onClick={() => setView("week")}>
                      Week
                    </Button>
                    <Button variant={view === "day" ? "default" : "outline"} size="sm" onClick={() => setView("day")}>
                      Day
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[600px]">
                  <Calendar
                    localizer={localizer}
                    events={filteredEvents}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: "100%" }}
                    view={view}
                    onView={setView}
                    date={date}
                    onNavigate={setDate}
                    eventPropGetter={eventStyleGetter}
                    onSelectEvent={setSelectedEvent}
                    popup
                    showMultiDayTimes
                    step={60}
                    showAllEvents
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Next 5 events on your calendar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">No upcoming events</p>
                  ) : (
                    upcomingEvents.map((event) => (
                      <div key={event.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                        <div
                          className={`w-3 h-3 rounded-full mt-1 ${
                            event.type === "campaign" ? "bg-green-500" : "bg-orange-500"
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{event.title}</p>
                          <p className="text-xs text-gray-500">{event.brand}</p>
                          <p className="text-xs text-gray-400">{format(new Date(event.start), "MMM d, yyyy")}</p>
                        </div>
                        <Badge variant={event.type === "campaign" ? "default" : "secondary"} className="text-xs">
                          {event.type}
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card>
              <CardHeader>
                <CardTitle>Legend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm">Campaigns</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    <span className="text-sm">Milestones</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-sm">Deadlines</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Personal Event
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Export Calendar
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Clock className="h-4 w-4 mr-2" />
                  Set Reminders
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Event Details Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{selectedEvent.title}</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedEvent(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Brand</p>
                    <p className="text-sm text-gray-900">{selectedEvent.brand}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Date</p>
                    <p className="text-sm text-gray-900">
                      {format(new Date(selectedEvent.start), "MMMM d, yyyy")}
                      {selectedEvent.end &&
                        new Date(selectedEvent.start).getTime() !== new Date(selectedEvent.end).getTime() &&
                        ` - ${format(new Date(selectedEvent.end), "MMMM d, yyyy")}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Type</p>
                    <Badge variant={selectedEvent.type === "campaign" ? "default" : "secondary"}>
                      {selectedEvent.type}
                    </Badge>
                  </div>
                  {selectedEvent.description && (
                    <div>
                      <p className="text-sm font-medium text-gray-600">Description</p>
                      <p className="text-sm text-gray-900">{selectedEvent.description}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </EnhancedInfluencerLayout>
  )
}
