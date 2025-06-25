export async function getMealPlans() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mealplan`);
  if (!res.ok) throw new Error('Failed to fetch meal plans');
  return res.json();
}