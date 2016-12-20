package com.interfacing.exemple.book.batch;

import org.springframework.batch.core.ExitStatus;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.core.StepExecutionListener;

/**
 * Created by ouazou on 27/02/16.
 */
public class SkipCheckingListener implements StepExecutionListener  {

    @Override
    public void beforeStep(StepExecution stepExecution) {

    }

    public ExitStatus afterStep(StepExecution stepExecution) {
        String exitCode = stepExecution.getExitStatus().getExitCode();
        System.out.println(stepExecution.getExitStatus().getExitDescription());
        if (stepExecution.getProcessSkipCount() > 0) {
            return new ExitStatus("COMPLETED WITH SKIPS");
        }
        else {
            return null;
        }
    }

}
