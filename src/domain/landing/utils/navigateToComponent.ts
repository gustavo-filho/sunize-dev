export function NavigateToComponent(id: string) {
  const component = document.getElementById(id);
  if (component) {
    component.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  return false;
}
