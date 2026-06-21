const avatarColors = ["#7c3aed", "#2563eb", "#059669", "#d97706", "#dc2626", "#0891b2"]

export function getAvatarColor(name) {
  return avatarColors[name.charCodeAt(0) % avatarColors.length]
}

export function normalizeUser(user) {
  const firstName = user.firstName || ""
  const lastName = user.lastName || ""
  const initials = ((firstName[0] || "") + (lastName[0] || "")).toUpperCase()

  const year = 2018 + (user.id % 6)
  const month = ((user.id * 3) % 12) + 1
  const day = ((user.id * 7) % 28) + 1
  const joinDate = new Date(year, month - 1, day).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return {
    id: user.id,
    name: `${firstName} ${lastName}`.trim(),
    firstName,
    lastName,
    role: user.company?.title || "Employee",
    department: user.company?.department || "General",
    status: "Active",
    location: user.address
      ? `${user.address.city}, ${user.address.stateCode || user.address.state}`
      : "Remote",
    email: user.email || "",
    phone: user.phone || "",
    joinDate,
    avatar: initials,
    avatarColor: getAvatarColor(firstName || "A"),
    bio: `${firstName} works as a ${user.company?.title || "team member"} in the ${user.company?.department || "General"} department.`,
  }
}
