# Controlled Component Explained

## What is a Controlled Component?

A **controlled component** is a component whose value/state is **controlled by its parent** through props, rather than managing its own internal state.

---

## Key Concept

### Controlled Component:
- ✅ **Parent owns the state**
- ✅ **Child receives value via props**
- ✅ **Child notifies parent of changes via callbacks**
- ✅ **Single source of truth**

### Uncontrolled Component:
- ❌ **Child owns the state**
- ❌ **Child manages its own state internally**
- ❌ **Parent doesn't know the value**
- ❌ **Multiple sources of truth**

---

## Visual Comparison

### Controlled Component (Your Current Setup) ✅

```
┌─────────────────────────────────────┐
│  Parent (PortfolioPage)             │
│                                      │
│  State: currentCategory = 'nature'  │ ← Parent owns state
│                                      │
│  ┌───────────────────────────────┐  │
│  │  GalleryFilters (Child)       │  │
│  │                                │  │
│  │  Props: currentCategory       │  │ ← Receives value
│  │  Callback: onFilterChange     │  │ ← Notifies parent
│  │                                │  │
│  │  User clicks →                │  │
│  │  onFilterChange('portrait')   │  │
│  └──────────────┬──────────────────┘  │
│                 │                      │
│  Updates state: currentCategory       │ ← Parent updates
│                 = 'portrait'          │
│                 │                      │
│  Re-renders with new prop             │
└─────────────────────────────────────┘
```

### Uncontrolled Component (Old Way) ❌

```
┌─────────────────────────────────────┐
│  Parent (PortfolioPage)             │
│                                      │
│  State: currentCategory = 'nature'  │ ← Parent state
│                                      │
│  ┌───────────────────────────────┐  │
│  │  GalleryFilters (Child)        │  │
│  │                                │  │
│  │  State: selectedCategory       │  │ ← Child state (duplicate!)
│  │         = 'nature'             │  │
│  │                                │  │
│  │  User clicks →                 │  │
│  │  Updates: selectedCategory     │  │ ← Child updates
│  │           = 'portrait'          │  │
│  │  Calls: onFilterChange()       │  │
│  └────────────────────────────────┘  │
│                                      │
│  ❌ Two states can get out of sync! │
└─────────────────────────────────────┘
```

---

## Your Code: Controlled Component

### Parent Component (PortfolioPage)

```tsx
// ✅ Parent owns the state
const [currentCategory, setCurrentCategory] = useState('all');
const [currentSubcategory, setCurrentSubcategory] = useState();

// ✅ Parent provides value and callback
<GalleryFilters
  currentCategory={currentCategory}        // ← Pass value
  currentSubcategory={currentSubcategory}  // ← Pass value
  onFilterChange={handleFilterChange}      // ← Pass callback
/>
```

### Child Component (GalleryFilters)

```tsx
// ✅ Child receives value via props (no internal state)
const selectedCategory = currentCategory;  // Uses prop directly
const selectedSubcategory = currentSubcategory;  // Uses prop directly

// ✅ Child notifies parent of changes
const handleCategoryClick = (categoryId: string) => {
  onFilterChange(categoryId);  // Notify parent, don't update own state
};
```

---

## Classic Example: Input Field

### Controlled Input ✅

```tsx
function ControlledInput() {
  const [value, setValue] = useState('');  // Parent owns state
  
  return (
    <input
      value={value}                    // ← Controlled by parent
      onChange={(e) => setValue(e.target.value)}  // ← Parent updates
    />
  );
}
```

**How it works:**
1. Input displays `value` from parent
2. User types → `onChange` fires
3. Parent updates `value` state
4. Input re-renders with new `value`

### Uncontrolled Input ❌

```tsx
function UncontrolledInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  
  return (
    <input
      ref={inputRef}  // ← Input manages its own value
      defaultValue="initial"  // ← Only set once
    />
  );
  
  // To get value: inputRef.current?.value
}
```

**How it works:**
1. Input manages its own value internally
2. Parent doesn't know the value
3. Must use `ref` to access value

---

## Real-World Example: Your GalleryFilters

### Before (Uncontrolled - Problematic) ❌

```tsx
// Child had its own state
function GalleryFilters({ onFilterChange, currentCategory }) {
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);
  //                                                          ↑
  //                                    Only uses initial value!
  
  const handleClick = (id) => {
    setSelectedCategory(id);      // Update child state
    onFilterChange(id);           // Update parent state
    // ❌ Two states to manage, can get out of sync
  };
}
```

**Problems:**
- If parent's `currentCategory` changes, child state doesn't update
- Two sources of truth
- Can get out of sync

### After (Controlled - Fixed) ✅

```tsx
// Child uses props directly
function GalleryFilters({ onFilterChange, currentCategory }) {
  const selectedCategory = currentCategory;  // ← Uses prop directly
  // No useState!
  
  const handleClick = (id) => {
    onFilterChange(id);  // Only notify parent
    // ✅ Single source of truth
  };
}
```

**Benefits:**
- Always in sync with parent
- Single source of truth
- Parent controls the value

---

## Controlled vs Uncontrolled Comparison

| Aspect | Controlled | Uncontrolled |
|--------|------------|--------------|
| **State Location** | Parent | Child |
| **Value Source** | Props | Internal state/ref |
| **Updates** | Parent updates, child re-renders | Child updates internally |
| **Parent Access** | Always knows value | Must use ref to access |
| **Sync** | Always in sync | Can get out of sync |
| **Use Case** | Forms, filters, shared state | Simple inputs, isolated components |

---

## When to Use Each

### Use Controlled Component ✅ When:

- **Parent needs to know the value**
  ```tsx
  // Parent needs to filter photos based on selection
  <GalleryFilters
    currentCategory={currentCategory}  // Parent needs this
    onFilterChange={handleFilterChange}
  />
  ```

- **Multiple components need same value**
  ```tsx
  // Both GalleryFilters and URL need same category
  const category = 'nature';
  <GalleryFilters currentCategory={category} />
  <URL path={`/portfolio/${category}`} />
  ```

- **Form validation**
  ```tsx
  // Parent validates before submission
  <FormInput
    value={email}
    onChange={setEmail}
    error={validateEmail(email)}
  />
  ```

### Use Uncontrolled Component ✅ When:

- **Simple, isolated input**
  ```tsx
  // Search box that doesn't need parent to know value
  <input ref={searchRef} />
  ```

- **Performance optimization**
  ```tsx
  // Large forms - uncontrolled can be faster
  <input defaultValue="initial" />
  ```

- **Third-party components**
  ```tsx
  // Some libraries work better uncontrolled
  <DatePicker ref={dateRef} />
  ```

---

## Your GalleryFilters: Why Controlled?

### Parent Needs the Value

```tsx
// PortfolioPage needs category to filter photos
const photos = getPhotosByCategory(
  currentCategory === 'all' ? undefined : currentCategory,
  currentSubcategory
);

// ✅ Parent must know the value to filter photos
```

### Single Source of Truth

```tsx
// ✅ One state in parent
const [currentCategory, setCurrentCategory] = useState('all');

// ✅ Child uses this value
<GalleryFilters currentCategory={currentCategory} />
```

### Always in Sync

```tsx
// ✅ When parent updates, child automatically updates
setCurrentCategory('portrait');
// → GalleryFilters receives new prop
// → Re-renders with 'portrait' selected
```

---

## Data Flow in Controlled Component

```
1. Parent has state
   currentCategory = 'nature'
   
2. Passes to child as prop
   <GalleryFilters currentCategory={currentCategory} />
   
3. Child displays value
   isSelected = (selectedCategory === category.id)
   // selectedCategory = currentCategory (from props)
   
4. User clicks button
   onClick={() => handleCategoryClick('portrait')}
   
5. Child calls parent callback
   onFilterChange('portrait')
   
6. Parent updates state
   setCurrentCategory('portrait')
   
7. Parent re-renders
   currentCategory = 'portrait'
   
8. Child receives new prop
   currentCategory = 'portrait' (new value)
   
9. Child re-renders
   Shows 'portrait' as selected ✅
```

---

## Key Characteristics

### Controlled Component Has:

1. **Value prop** - Receives current value
   ```tsx
   currentCategory={currentCategory}  // ← Value prop
   ```

2. **Change callback** - Notifies parent of changes
   ```tsx
   onFilterChange={handleFilterChange}  // ← Callback prop
   ```

3. **No internal state** - Uses props directly
   ```tsx
   const selectedCategory = currentCategory;  // ← No useState
   ```

---

## Summary

### Controlled Component:
- ✅ **Parent owns state**
- ✅ **Child receives value via props**
- ✅ **Child notifies parent via callbacks**
- ✅ **Single source of truth**
- ✅ **Always in sync**

### Your GalleryFilters:
- ✅ **Controlled component**
- ✅ **Parent (PortfolioPage) owns state**
- ✅ **Child (GalleryFilters) uses props**
- ✅ **No duplicate state**
- ✅ **Always synchronized**

**Think of it like a remote control:**
- **Controlled**: Parent is the remote, child is the TV (parent controls)
- **Uncontrolled**: Child is both remote and TV (self-controlled)

