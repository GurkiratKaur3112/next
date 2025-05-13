"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import {
  ArrowUpRight,
  Check,
  Code,
  FileText,
  BarChart3,
  Brain,
  Trophy,
  CheckCircle2,
  ChevronDown,
  Search,
  Filter,
  Sparkles,
  BookOpen,
  Clock,
  Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs-updated"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface Problem {
  id: number
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  tags: string[]
  rank: string
  leetcodeUrl: string
  notes: string
  solution: string
}

// Generate more problems for infinite scrolling demo
const generateMoreProblems = (baseProblems: Problem[], count: number): Problem[] => {
  const result: Problem[] = [...baseProblems]

  for (let i = baseProblems.length + 1; i <= baseProblems.length + count; i++) {
    const baseProblem = baseProblems[i % baseProblems.length]
    result.push({
      ...baseProblem,
      id: i,
      title: `${baseProblem.title} ${Math.floor(i / baseProblems.length) + 1}`,
    })
  }

  return result
}

const baseProblems: Problem[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    tags: ["Array", "Hash Table"],
    leetcodeUrl: "https://leetcode.com/problems/two-sum/",
    rank: "1300-1400",
    notes:
      "Use a hash map to store the values and their indices. For each element, check if the target - current element exists in the hash map.",
    solution: `function twoSum(nums: number[], target: number): number[] { 
  const map = new Map<number, number>(); 
  for (let i = 0; i < nums.length; i++) { 
    const complement = target - nums[i]; 
    if (map.has(complement)) { 
      return [map.get(complement)!, i]; 
    } 
    map.set(nums[i], i); 
  } 
  return []; 
}`,
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "Easy",
    tags: ["Stack", "String"],
    leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/",
    rank: "1200-1300",
    notes:
      "Use a stack to keep track of opening brackets. When a closing bracket is encountered, check if it matches the top of the stack.",
    solution: `function isValid(s: string): boolean { 
  const stack: string[] = []; 
  const map: Record<string, string> = { ')': '(', '}': '{', ']': '[' }; 
  for (const char of s) { 
    if (char === '(' || char === '{' || char === '[') { 
      stack.push(char); 
    } else { 
      const top = stack.pop(); 
      if (top !== map[char]) { 
        return false; 
      } 
    } 
  } 
  return stack.length === 0; 
}`,
  },
  {
    id: 3,
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    tags: ["Linked List", "Recursion"],
    leetcodeUrl: "https://leetcode.com/problems/merge-two-sorted-lists/",
    rank: "1400-1500",
    notes:
      "Create a dummy head node. Compare the values of the two lists and append the smaller one to the result list.",
    solution: `function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null { 
  const dummy = new ListNode(0); 
  let current = dummy; 
  while (list1 !== null && list2 !== null) { 
    if (list1.val < list2.val) { 
      current.next = list1; 
      list1 = list1.next; 
    } else { 
      current.next = list2; 
      list2 = list2.next; 
    } 
    current = current.next; 
  } 
  current.next = list1 !== null ? list1 : list2; 
  return dummy.next; 
}`,
  },
  {
    id: 4,
    title: "Maximum Subarray",
    difficulty: "Medium",
    tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
    leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/",
    rank: "1800-1900",
    notes:
      "Use Kadane's algorithm to find the maximum sum subarray. Keep track of the current sum and the maximum sum seen so far.",
    solution: `function maxSubArray(nums: number[]): number { 
  let currentSum = nums[0]; 
  let maxSum = nums[0]; 
  for (let i = 1; i < nums.length; i++) { 
    currentSum = Math.max(nums[i], currentSum + nums[i]); 
    maxSum = Math.max(maxSum, currentSum); 
  } 
  return maxSum; 
}`,
  },
  {
    id: 5,
    title: "Climbing Stairs",
    difficulty: "Easy",
    tags: ["Dynamic Programming"],
    leetcodeUrl: "https://leetcode.com/problems/climbing-stairs/",
    rank: "1500-1600",
    notes:
      "This is essentially a Fibonacci sequence problem. The number of ways to reach the nth step is the sum of the ways to reach the (n-1)th and (n-2)th steps.",
    solution: `function climbStairs(n: number): number { 
  if (n <= 2) return n; 
  let prev1 = 1; 
  let prev2 = 2; 
  let current = 0; 
  for (let i = 3; i <= n; i++) { 
    current = prev1 + prev2; 
    prev1 = prev2; 
    prev2 = current; 
  } 
  return prev2; 
}`,
  },
  {
    id: 6,
    title: "Binary Tree Inorder Traversal",
    difficulty: "Easy",
    tags: ["Stack", "Tree", "Depth-First Search", "Binary Tree"],
    leetcodeUrl: "https://leetcode.com/problems/binary-tree-inorder-traversal/",
    rank: "1700-1800",
    notes:
      "Use a stack to simulate the recursion. Push all left nodes first, then process the node, then move to the right subtree.",
    solution: `function inorderTraversal(root: TreeNode | null): number[] { 
  const result: number[] = []; 
  const stack: TreeNode[] = []; 
  let current = root; 
  while (current !== null || stack.length > 0) { 
    while (current !== null) { 
      stack.push(current); 
      current = current.left; 
    } 
    current = stack.pop()!; 
    result.push(current.val); 
    current = current.right; 
  } 
  return result; 
}`,
  },
  {
    id: 7,
    title: "Symmetric Tree",
    difficulty: "Easy",
    tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Binary Tree"],
    leetcodeUrl: "https://leetcode.com/problems/symmetric-tree/",
    rank: "1600-1700",
    notes:
      "Check if the left subtree is a mirror reflection of the right subtree. This can be done recursively or iteratively.",
    solution: `function isSymmetric(root: TreeNode | null): boolean { 
  if (root === null) return true; 
  function isMirror(left: TreeNode | null, right: TreeNode | null): boolean { 
    if (left === null && right === null) return true; 
    if (left === null || right === null) return false; 
    return (left.val === right.val && isMirror(left.left, right.right) && isMirror(left.right, right.left)); 
  } 
  return isMirror(root.left, root.right); 
}`,
  },
  {
    id: 8,
    title: "Reverse Linked List",
    difficulty: "Easy",
    tags: ["Linked List", "Recursion"],
    leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list/",
    rank: "1700-1800",
    notes: "Iterate through the list and change the next pointer of each node to point to the previous node.",
    solution: `function reverseList(head: ListNode | null): ListNode | null { 
  let prev: ListNode | null = null; 
  let current = head; 
  while (current !== null) { 
    const next = current.next; 
    current.next = prev; 
    prev = current; 
    current = next; 
  } 
  return prev; 
}`,
  },
  {
    id: 9,
    title: "Invert Binary Tree",
    difficulty: "Easy",
    tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Binary Tree"],
    leetcodeUrl: "https://leetcode.com/problems/invert-binary-tree/",
    rank: "1400-1500",
    notes: "Swap the left and right children of each node recursively.",
    solution: `function invertTree(root: TreeNode | null): TreeNode | null { 
  if (root === null) return null; 
  const left = invertTree(root.left); 
  const right = invertTree(root.right); 
  root.left = right; 
  root.right = left; 
  return root; 
}`,
  },
  {
    id: 10,
    title: "Kth Largest Element in an Array",
    difficulty: "Medium",
    tags: ["Array", "Divide and Conquer", "Sorting", "Heap (Priority Queue)", "Quickselect"],
    leetcodeUrl: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
    rank: "1500-1600",
    notes:
      "Use a min heap of size k to keep track of the k largest elements. Alternatively, use quickselect for O(n) average time complexity.",
    solution: `function findKthLargest(nums: number[], k: number): number { 
  nums.sort((a, b) => b - a); 
  return nums[k - 1]; 
}`,
  },
]

// Generate 50 problems for the demo
const problems = generateMoreProblems(baseProblems, 40)

// Get unique rank values for the selector
const rankRanges = ["all", ...Array.from(new Set(problems.map((p) => p.rank))).sort()]

// Get unique tags for filtering
const allTags = Array.from(new Set(problems.flatMap((p) => p.tags))).sort()

export function DsaTable() {
  const [completed, setCompleted] = useState<Set<number>>(new Set())
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null)
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)
  const [selectedRank, setSelectedRank] = useState<string>("all")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [visibleProblems, setVisibleProblems] = useState<Problem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadingRef = useRef<HTMLDivElement>(null)
  const ITEMS_PER_PAGE = 10

  // Filter problems based on rank, search query, and tags
  const getFilteredProblems = useCallback(() => {
    let filtered = problems

    // Filter by rank
    if (selectedRank !== "all") {
      filtered = filtered.filter((problem) => problem.rank === selectedRank)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (problem) =>
          problem.title.toLowerCase().includes(query) || problem.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((problem) => selectedTags.every((tag) => problem.tags.includes(tag)))
    }

    return filtered
  }, [selectedRank, searchQuery, selectedTags])

  // Load initial problems
  useEffect(() => {
    const filtered = getFilteredProblems()
    setVisibleProblems(filtered.slice(0, ITEMS_PER_PAGE))
    setPage(1)
  }, [selectedRank, searchQuery, selectedTags, getFilteredProblems])

  // Set up intersection observer for infinite scrolling
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    const callback = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      if (entry.isIntersecting && !isLoading) {
        loadMoreProblems()
      }
    }

    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: "100px",
    })

    if (loadingRef.current) {
      observerRef.current.observe(loadingRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [isLoading, page])

  const loadMoreProblems = () => {
    setIsLoading(true)

    // Simulate API call with setTimeout
    setTimeout(() => {
      const filtered = getFilteredProblems()
      const nextPage = page + 1
      const start = (nextPage - 1) * ITEMS_PER_PAGE
      const end = start + ITEMS_PER_PAGE

      if (start < filtered.length) {
        setVisibleProblems((prev) => [...prev, ...filtered.slice(start, end)])
        setPage(nextPage)
      }

      setIsLoading(false)
    }, 500)
  }

  const toggleCompletion = (id: number) => {
    const newCompleted = new Set(completed)
    if (newCompleted.has(id)) {
      newCompleted.delete(id)
    } else {
      newCompleted.add(id)
    }
    setCompleted(newCompleted)
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400"
      case "Medium":
        return "text-amber-400"
      case "Hard":
        return "text-red-400"
      default:
        return "text-white-400"
    }
  }

  const getDifficultyBgColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-400/20 border-green-400/50"
      case "Medium":
        return "bg-amber-400/20 border-amber-400/50"
      case "Hard":
        return "bg-red-400/20 border-red-400/50"
      default:
        return "bg-white-400/20 border-white-400/50"
    }
  }

  const getRankColor = (rank: string) => {
    const rankNum = Number.parseInt(rank.split("-")[0])
    if (rankNum < 1400) return "from-green-500 to-cyan-500"
    if (rankNum < 1600) return "from-cyan-500 to-blue-500"
    if (rankNum < 1800) return "from-blue-500 to-purple-500"
    return "from-purple-500 to-pink-500"
  }

  const filteredProblems = getFilteredProblems()

  return (
    <div className="space-y-6">
      {/* Header with title and stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
            DSA Problem Tracker
          </h1>
          <p className="text-cyan-100/70 mt-1">Track your progress on data structure and algorithm problems</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-cyan-900/30 px-3 py-1.5 rounded-lg border border-cyan-700/30">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-300">
              {completed.size} / {problems.length} Completed
            </span>
          </div>

          <div className="flex items-center gap-2 bg-cyan-900/30 px-3 py-1.5 rounded-lg border border-cyan-700/30">
            <Clock className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-300">
              {Math.round((completed.size / problems.length) * 100)}% Progress
            </span>
          </div>
        </div>
      </div>

      {/* Search and filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyan-500" />
          <Input
            placeholder="Search problems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-20 bg-black/40 border border-cyan-700/50 text-cyan-100 placeholder:text-cyan-500/50 focus-visible:ring-cyan-500 hover:bg-cyan-900/20 transition-all duration-300 rounded-lg"

          />
        </div> */}

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg border border-cyan-700/50 bg-black/40 text-cyan-100 backdrop-blur-sm hover:bg-cyan-900/20 transition-all duration-300"
          >
            <div className="flex items-center space-x-3">
              <Filter className="h-4 w-4 text-cyan-500" />
              {selectedRank !== "all" && (
                <div className={`h-3 w-3 rounded-full bg-gradient-to-r ${getRankColor(selectedRank)}`}></div>
              )}
              <span className="font-mono">{selectedRank === "all" ? "All Rank Ranges" : selectedRank}</span>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-cyan-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute z-50 mt-2 w-full rounded-lg border border-cyan-700/50 bg-black/95 backdrop-blur-md shadow-lg shadow-cyan-900/20 animate-in fade-in-50 zoom-in-95">
              <div className="py-1 max-h-60 overflow-auto custom-scrollbar">
                {rankRanges.map((rank) => (
                  <button
                    key={rank}
                    className={`w-full text-left px-4 py-2.5 flex items-center space-x-3 hover:bg-cyan-900/30 transition-colors ${selectedRank === rank ? "bg-cyan-900/50 text-cyan-300" : "text-cyan-100"}`}
                    onClick={() => {
                      setSelectedRank(rank)
                      setIsDropdownOpen(false)
                    }}
                  >
                    {rank !== "all" && (
                      <div className={`h-3 w-3 rounded-full bg-gradient-to-r ${getRankColor(rank)}`}></div>
                    )}
                    <span className="font-mono">{rank === "all" ? "All Rank Ranges" : rank}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full border-cyan-700/50 bg-black/40 text-cyan-100">
                <BookOpen className="mr-2 h-4 w-4 text-cyan-500" />
                Filter by Tags ({selectedTags.length})
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md border border-cyan-700/50 bg-zinc-900/95 text-cyan-100 backdrop-blur-md">
              <DialogHeader>
                <DialogTitle className="text-xl text-cyan-300">Filter by Tags</DialogTitle>
              </DialogHeader>
              <div className="mt-4 flex flex-wrap gap-2 max-h-[300px] overflow-y-auto custom-scrollbar p-1">
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className={`cursor-pointer transition-all duration-200 ${selectedTags.includes(tag)
                      ? "bg-cyan-900/50 border-cyan-500 text-cyan-300"
                      : "bg-black/20 hover:bg-cyan-900/30"
                      }`}
                    onClick={() => toggleTag(tag)}
                  >
                    {selectedTags.includes(tag) && <Check className="mr-1 h-3 w-3" />}
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-between mt-4">
                <Button
                  variant="outline"
                  className="border-cyan-700/50 text-cyan-400"
                  onClick={() => setSelectedTags([])}
                >
                  Clear All
                </Button>
                <Button
                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                  onClick={() =>
                    document
                      .querySelector('[role="dialog"] button[aria-label="Close"]')
                      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
                  }
                >
                  Apply Filters
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Active filters display */}
      {(selectedTags.length > 0 || selectedRank !== "all" || searchQuery) && (
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-sm text-cyan-400">Active filters:</span>

          {selectedRank !== "all" && (
            <Badge className="bg-cyan-900/40 text-cyan-300 border-cyan-700/50 hover:bg-cyan-900/60">
              Rank: {selectedRank}
              <button className="ml-1 hover:text-cyan-100" onClick={() => setSelectedRank("all")}>
                ×
              </button>
            </Badge>
          )}

          {searchQuery && (
            <Badge className="bg-cyan-900/40 text-cyan-300 border-cyan-700/50 hover:bg-cyan-900/60">
              Search: {searchQuery}
              <button className="ml-1 hover:text-cyan-100" onClick={() => setSearchQuery("")}>
                ×
              </button>
            </Badge>
          )}

          {selectedTags.map((tag) => (
            <Badge key={tag} className="bg-cyan-900/40 text-cyan-300 border-cyan-700/50 hover:bg-cyan-900/60">
              {tag}
              <button className="ml-1 hover:text-cyan-100" onClick={() => toggleTag(tag)}>
                ×
              </button>
            </Badge>
          ))}

          <Button
            variant="link"
            className="h-auto p-0 text-cyan-400 hover:text-cyan-300"
            onClick={() => {
              setSelectedRank("all")
              setSearchQuery("")
              setSelectedTags([])
            }}
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Results count */}
      <div className="text-sm text-cyan-400 mb-2">
        Showing {visibleProblems.length} of {filteredProblems.length} problems
      </div>

      {/* Table with problems */}
      <div className="overflow-hidden rounded-xl border border-cyan-600/30 bg-black/60 backdrop-blur-sm">
        <div className="relative overflow-x-auto">
          {/* Grid background for futuristic look */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.03)_0,_transparent_1.5rem)]"></div>

          <table className="w-full">
            <thead>
              <tr className="border-b border-cyan-700/30 bg-cyan-950/50">
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-cyan-300">#</th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-cyan-300">Problem</th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-cyan-300">Difficulty</th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-cyan-300">Rank</th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-cyan-300">Tags</th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-cyan-300">LeetCode</th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-cyan-300">Completed</th>
              </tr>
            </thead>
            <tbody className="relative">
              {visibleProblems.map((problem) => (
                <tr
                  key={problem.id}
                  className={`relative border-b border-cyan-700/30 transition-all duration-300 
                    ${completed.has(problem.id) ? "bg-cyan-900/20" : ""}
                    ${hoveredRow === problem.id ? "bg-cyan-800/30" : "hover:bg-cyan-900/10"}`}
                  onMouseEnter={() => setHoveredRow(problem.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-mono text-cyan-300">
                    {completed.has(problem.id) ? <CheckCircle2 className="h-5 w-5 text-cyan-400" /> : problem.id}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="link"
                          className="h-auto p-0 text-left text-cyan-100 hover:text-cyan-400 hover:underline"
                          onClick={() => setSelectedProblem(problem)}
                        >
                          {problem.title}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl border border-cyan-700/50 bg-zinc-900/95 text-cyan-100 backdrop-blur-md">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2 text-xl text-cyan-300">
                            <span>{problem.title}</span>
                            <span className={getDifficultyColor(problem.difficulty)}>({problem.difficulty})</span>
                          </DialogTitle>
                        </DialogHeader>
                        <Tabs defaultValue="notes" className="mt-4">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="notes">
                              <FileText className="mr-2 h-4 w-4" />
                              Notes
                            </TabsTrigger>
                            <TabsTrigger value="solution">
                              <Code className="mr-2 h-4 w-4" />
                              Solution
                            </TabsTrigger>
                          </TabsList>
                          <TabsContent
                            value="notes"
                            className="rounded-md border border-cyan-700/30 bg-zinc-800/30 p-4 backdrop-blur-sm"
                          >
                            <p>{problem.notes}</p>
                          </TabsContent>
                          <TabsContent
                            value="solution"
                            className="rounded-md border border-cyan-700/30 bg-zinc-800/30 p-4 backdrop-blur-sm"
                          >
                            <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-sm text-cyan-100">
                              <code>{problem.solution}</code>
                            </pre>
                          </TabsContent>
                        </Tabs>
                        <div className="mt-4 flex justify-between">
                          <Button
                            variant="outline"
                            className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300"
                            onClick={() => toggleCompletion(problem.id)}
                          >
                            {completed.has(problem.id) ? (
                              <>
                                <Check className="mr-2 h-4 w-4" /> Completed
                              </>
                            ) : (
                              "Mark as Completed"
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            className="border-zinc-600 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100"
                            asChild
                          >
                            <Link href={problem.leetcodeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                              Open in LeetCode
                              <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getDifficultyBgColor(problem.difficulty)}`}
                    >
                      {problem.difficulty}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm">
                    <span
                      className={`inline-flex items-center rounded-full bg-gradient-to-r ${getRankColor(problem.rank)} bg-opacity-20 px-2.5 py-0.5 text-xs font-mono text-white border border-white/10`}
                    >
                      {problem.rank}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex flex-wrap gap-1">
                      {problem.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-cyan-900/30 px-2 py-0.5 text-xs font-medium text-cyan-300 border border-cyan-700/30"
                        >
                          {tag}
                        </span>
                      ))}
                      {problem.tags.length > 2 && (
                        <span className="inline-flex items-center rounded-full bg-cyan-900/20 px-2 py-0.5 text-xs font-medium text-cyan-400/70">
                          +{problem.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 border-cyan-700/30 bg-cyan-900/20 text-cyan-300 hover:bg-cyan-800/30 hover:text-cyan-100"
                      asChild
                    >
                      <Link href={problem.leetcodeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
                        LeetCode
                      </Link>
                    </Button>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm">
                    <Switch
                      checked={completed.has(problem.id)}
                      onCheckedChange={() => toggleCompletion(problem.id)}
                      className="data-[state=checked]:bg-cyan-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Loading indicator for infinite scroll */}
        <div ref={loadingRef} className="py-4 flex justify-center">
          {isLoading && (
            <div className="flex items-center space-x-2 text-cyan-400">
              <div className="h-4 w-4 rounded-full bg-cyan-400 animate-ping"></div>
              <span>Loading more problems...</span>
            </div>
          )}
        </div>

        {/* Stats footer */}
        <div className="border-t border-cyan-700/30 bg-cyan-950/50 p-4">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm text-zinc-400">
                <span className="font-medium text-cyan-400">{completed.size}</span> of{" "}
                <span className="font-medium text-zinc-300">{problems.length}</span> problems completed
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-zinc-300">Difficulty:</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                  <span className="text-xs text-zinc-400">Easy</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-amber-400"></div>
                  <span className="text-xs text-zinc-400">Medium</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <span className="text-xs text-zinc-400">Hard</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-4">
        <Card className="border-cyan-700/30 bg-cyan-900/10 text-cyan-100 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-cyan-400" />
                <h3 className="text-lg font-medium">Progress</h3>
              </div>
              <span className="text-2xl font-bold text-cyan-400">
                {Math.round((completed.size / problems.length) * 100)}%
              </span>
            </div>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse-slow"
                style={{ width: `${(completed.size / problems.length) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-cyan-700/30 bg-cyan-900/10 text-cyan-100 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-400/20 text-green-400">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-zinc-400">Easy Problems</p>
                <p className="text-xl font-bold">
                  {
                    Array.from(completed).filter((id) => problems.find((p) => p.id === id)?.difficulty === "Easy")
                      .length
                  }{" "}
                  / {problems.filter((p) => p.difficulty === "Easy").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-cyan-700/30 bg-cyan-900/10 text-cyan-100 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400/20 text-amber-400">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-zinc-400">Medium Problems</p>
                <p className="text-xl font-bold">
                  {
                    Array.from(completed).filter((id) => problems.find((p) => p.id === id)?.difficulty === "Medium")
                      .length
                  }{" "}
                  / {problems.filter((p) => p.difficulty === "Medium").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-cyan-700/30 bg-cyan-900/10 text-cyan-100 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-400/20 text-red-400">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-zinc-400">Hard Problems</p>
                <p className="text-xl font-bold">
                  {
                    Array.from(completed).filter((id) => problems.find((p) => p.id === id)?.difficulty === "Hard")
                      .length
                  }{" "}
                  / {problems.filter((p) => p.difficulty === "Hard").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

