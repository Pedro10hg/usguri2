import {
  Camera,
  PartyPopper,
  Coffee,
  Trophy,
  Users,
  Lightbulb,
  Shirt,
  Ruler,
  Palette,
  MessageCircle,
  Flame,
  Music,
  MapPin,
  type LucideIcon,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Camera,
  PartyPopper,
  Coffee,
  Trophy,
  Users,
  Lightbulb,
  Shirt,
  Ruler,
  Palette,
  MessageCircle,
  Flame,
  Music,
  MapPin,
}

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Users
}
