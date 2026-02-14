import {
  Camera,
  PartyPopper,
  Coffee,
  Trophy,
  Code2,
  Users,
  Lightbulb,
  Shirt,
  Ruler,
  Palette,
  MessageCircle,
  type LucideIcon,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Camera,
  PartyPopper,
  Coffee,
  Trophy,
  Code2,
  Users,
  Lightbulb,
  Shirt,
  Ruler,
  Palette,
  MessageCircle,
}

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Code2
}
