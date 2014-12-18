package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeMerchandiseInfo;
import com.shinowit.entity.TMeUnitInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/18.
 */
public class MerchandiseInfoinsertAction extends ActionSupport{
    private boolean success;
    private boolean failse;
    private String message;
    private TMeMerchandiseInfo chan;
    private List<TMeMerchandiseInfo> list;
    @Resource
    private BaseDAO<TMeMerchandiseInfo> dao;

    public String insert(){
        list=dao.listAll(TMeMerchandiseInfo.class);
        for(TMeMerchandiseInfo u:list){
            if(u.getMerchandiseName().trim().equals(chan.getMerchandiseName().trim())){
                setSuccess(true);
                setFailse(false);
                setMessage("您插入失败！");
                return SUCCESS;
            }
        }
        setMessage("插入成功！");
        setFailse(true);
        setSuccess(true);
        dao.insert(chan);
        return SUCCESS;
    }

    public boolean isFailse() {
        return failse;
    }

    public void setFailse(boolean failse) {
        this.failse = failse;
    }

    public TMeMerchandiseInfo getChan() {
        return chan;
    }

    public void setChan(TMeMerchandiseInfo chan) {
        this.chan = chan;
    }

    public List<TMeMerchandiseInfo> getList() {
        return list;
    }

    public void setList(List<TMeMerchandiseInfo> list) {
        this.list = list;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
