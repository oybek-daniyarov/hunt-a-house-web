import {
  InfoCircledIcon,
  MagnifyingGlassIcon,
  ReloadIcon,
} from '@radix-ui/react-icons';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useSearch } from './search-provider';

function formatTime(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleTimeString();
}

function MetricsPopover({ metrics }: { metrics: any }) {
  if (!metrics) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 text-xs px-2 text-muted-foreground hover:text-foreground"
        >
          <InfoCircledIcon className="h-3.5 w-3.5 mr-1.5" />
          Total: {formatTime(metrics.duration || 0)} | Tokens:{' '}
          {metrics.totalTokens}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-3">
        <div className="grid gap-2 text-sm">
          <div className="font-medium text-primary/80">Workflow Metrics</div>
          <div className="grid grid-cols-[100px,1fr] gap-2">
            <span className="text-muted-foreground">Started</span>
            <span className="font-medium">{formatDate(metrics.startedAt)}</span>
            <span className="text-muted-foreground">Duration</span>
            <span className="font-medium">
              {formatTime(metrics.duration || 0)}
            </span>
            <span className="text-muted-foreground">Total Tokens</span>
            <span className="font-medium">
              {metrics.totalTokens.toLocaleString()}
            </span>
            <span className="text-muted-foreground">Steps</span>
            <span className="font-medium">
              {metrics.completedSteps}/{metrics.totalSteps} completed
              {metrics.failedSteps > 0 && `, ${metrics.failedSteps} failed`}
            </span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function PropertySearchForm() {
  const { state, input, error, handleInputChange, handleSubmit, reload } =
    useSearch();
  const hasMessages = state.isInitialized;
  const isComplete = state.step.progress === 100;

  return (
    <div className="w-full transition-all duration-500 ease-in-out">
      {state.isInitialized && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="text-primary/80 font-medium">
                {isComplete ? 'Completed' : `Step: ${state.step.stepLabel}`}
              </span>
              {state.step.processingTime && !isComplete && (
                <span className="text-xs text-muted-foreground/70">
                  ({formatTime(state.step.processingTime)})
                </span>
              )}
              {isComplete && state.metrics && (
                <MetricsPopover metrics={state.metrics} />
              )}
            </div>
            <span className="text-sm font-medium text-primary/80">
              {Math.round(state.step.progress)}%
            </span>
          </div>
        </div>
      )}

      <div className="relative group">
        <div className="absolute -inset-3 bg-gradient-to-r from-muted/30 via-primary/10 to-muted/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <form onSubmit={handleSubmit} className="relative flex gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-card via-muted/20 to-card opacity-50" />
            <div className="absolute inset-y-0 left-3.5 flex items-center">
              <MagnifyingGlassIcon className="h-4 w-4 text-primary/50" />
            </div>
            <Input
              type="text"
              placeholder="2 bedroom apartment in Dubai Marina for a short stay"
              value={input}
              onChange={handleInputChange}
              disabled={state.isSearching}
              className="pl-10 pr-4 py-2.5 h-11 bg-background/80 backdrop-blur-sm border-border/40 hover:border-border/80 focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-all text-sm rounded-xl"
            />
          </div>
          <Button
            type="submit"
            disabled={state.isSearching}
            variant="secondary"
            className="h-11 px-6 rounded-xl bg-primary/10 hover:bg-primary/20 border-primary/20 hover:border-primary/30 transition-all duration-200 relative group/btn"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
            <div className="relative flex items-center justify-center gap-2">
              {state.isSearching ? (
                <>
                  <div className="relative h-4 w-4">
                    <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
                    <div
                      className="absolute inset-0 rounded-full border-2 border-primary/70 transition-all duration-200"
                      style={{
                        clipPath: `polygon(50% 50%, 50% 0%, ${50 + Math.cos((state.step.progress / 100) * Math.PI * 2) * 50}% ${50 - Math.sin((state.step.progress / 100) * Math.PI * 2) * 50}%, ${state.step.progress >= 75 ? '100% 0%, 100% 100%, 0% 100%, 0% 0%' : state.step.progress >= 50 ? '100% 0%, 100% 100%, 0% 100%' : state.step.progress >= 25 ? '100% 0%, 100% 100%' : '100% 0%'})`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium">Searching...</span>
                </>
              ) : (
                <span className="text-sm font-medium">Search</span>
              )}
            </div>
          </Button>
        </form>
      </div>

      {error && (
        <div className="mt-4">
          <Alert
            variant="destructive"
            className="bg-destructive/5 text-destructive border-none rounded-xl"
          >
            <AlertDescription className="flex items-center justify-between text-sm">
              <span>An error occurred while searching. Please try again.</span>
              <Button
                variant="outline"
                size="sm"
                onClick={reload}
                disabled={state.isSearching}
                className="h-8 text-sm border-destructive/30 hover:bg-destructive/10 rounded-lg"
              >
                <ReloadIcon className="mr-2 h-3.5 w-3.5" />
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}
