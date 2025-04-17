"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Check, Code, FileText, BarChart3, Brain, Trophy, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs-complete"

interface Problem {
  id: number
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  tags: string[]
  leetcodeUrl: string
  notes: string
  solution: string
}

const problems: Problem[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    tags: ["Array", "Hash Table"],
    leetcodeUrl: "https://leetcode.com/problems/two-sum/",
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
    notes:
      "Use a stack to keep track of opening brackets. When a closing bracket is encountered, check if it matches the top of the stack.",
    solution: `function isValid(s: string): boolean {
  const stack: string[] = [];
  const map: Record<string, string> = {
    ')': '(',
    '}': '{',
    ']': '['
  };
  
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
    notes:
      "Check if the left subtree is a mirror reflection of the right subtree. This can be done recursively or iteratively.",
    solution: `function isSymmetric(root: TreeNode | null): boolean {
  if (root === null) return true;
  
  function isMirror(left: TreeNode | null, right: TreeNode | null): boolean {
    if (left === null && right === null) return true;
    if (left === null || right === null) return false;
    
    return (
      left.val === right.val &&
      isMirror(left.left, right.right) &&
      isMirror(left.right, right.left)
    );
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
    notes:
      "Use a min heap of size k to keep track of the k largest elements. Alternatively, use quickselect for O(n) average time complexity.",
    solution: `function findKthLargest(nums: number[], k: number): number {
  // Using sorting approach for simplicity
  nums.sort((a, b) => b - a);
  return nums[k - 1];
  
  // In a real implementation, you might want to use quickselect or a heap
}`,
  },
]

export function DsaTable() {
  const [completed, setCompleted] = useState<Set<number>>(new Set())
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null)
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)

  const toggleCompletion = (id: number) => {
    const newCompleted = new Set(completed)
    if (newCompleted.has(id)) {
      newCompleted.delete(id)
    } else {
      newCompleted.add(id)
    }
    setCompleted(newCompleted)
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

  return (
    <div className="overflow-hidden rounded-xl border border-cyan-600/30 bg-black/60 backdrop-blur-sm">
      <div className="relative overflow-x-auto">
        {/* Grid background for futuristic look */}
        <div className="absolute inset-0 bg-dots opacity-30"></div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-cyan-700/30 bg-cyan-950/50">
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-cyan-300">#</th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-cyan-300">Problem</th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-cyan-300">Difficulty</th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-cyan-300">Tags</th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-cyan-300">LeetCode</th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-cyan-300">Completed</th>
            </tr>
          </thead>
          <tbody className="relative">
            {problems.map((problem) => (
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
                        className="h-auto p-0 text-left text-cyan-100 hover:text-cyan-400 hover:text-glow"
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
                        <TabsList className="grid w-full grid-cols-2 bg-zinc-800/50">
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
                          <Link href={problem.leetcodeUrl} target="_blank" rel="noopener noreferrer">
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
                <td className="px-4 py-3 text-sm">
                  <div className="flex flex-wrap gap-1">
                    {problem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-cyan-900/30 px-2 py-0.5 text-xs font-medium text-cyan-300 border border-cyan-700/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 border-cyan-700/30 bg-cyan-900/20 text-cyan-300 hover:bg-cyan-800/30 hover:text-cyan-100"
                    asChild
                  >
                    <Link href={problem.leetcodeUrl} target="_blank" rel="noopener noreferrer">
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

      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
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
                className="h-full rounded-full bg-cyan-400 animate-pulse-slow"
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
      </div>
    </div>
  )
}
