package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.service.selectdelete;
import com.shinowit.service.selectdelete1;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/11/26.
 */
public class outstockdetailselectAction extends ActionSupport{
    private boolean success;
    private boolean failse;
    private String message;
    private String arry2;
    @Resource
    private selectdelete1 seldel1;
    public String select(){
        String []cha=arry2.split(",");
        boolean result=seldel1.seldel(cha);
        if(result){
            setMessage("出库单删除成功！");
            setSuccess(true);
            setFailse(true);
            return SUCCESS;
        }
        setFailse(false);
        setMessage("出库单删除失败！");
        setSuccess(true);
        return SUCCESS;
    }


    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public boolean isFailse() {
        return failse;
    }

    public void setFailse(boolean failse) {
        this.failse = failse;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getArry2() {
        return arry2;
    }

    public void setArry2(String arry2) {
        this.arry2 = arry2;
    }
}
